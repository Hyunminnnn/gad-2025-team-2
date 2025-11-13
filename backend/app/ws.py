from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List
import json
import asyncio


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, conversation_id: str):
        await websocket.accept()
        if conversation_id not in self.active_connections:
            self.active_connections[conversation_id] = []
        self.active_connections[conversation_id].append(websocket)

    def disconnect(self, websocket: WebSocket, conversation_id: str):
        if conversation_id in self.active_connections:
            self.active_connections[conversation_id].remove(websocket)
            if not self.active_connections[conversation_id]:
                del self.active_connections[conversation_id]

    async def send_message(self, message: dict, conversation_id: str):
        if conversation_id in self.active_connections:
            for connection in self.active_connections[conversation_id]:
                try:
                    await connection.send_json(message)
                except:
                    pass

    async def broadcast(self, message: dict, conversation_id: str):
        await self.send_message(message, conversation_id)


manager = ConnectionManager()


async def websocket_endpoint(websocket: WebSocket, conversation_id: str):
    """WebSocket endpoint for real-time chat"""
    await manager.connect(websocket, conversation_id)
    try:
        while True:
            data = await websocket.receive_json()
            # Broadcast message to all connections in this conversation
            await manager.broadcast(data, conversation_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket, conversation_id)

