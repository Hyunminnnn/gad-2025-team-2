"""
Seed script to populate database with realistic test data
Run: python -m app.seed
"""
from sqlmodel import Session
from app.db import engine, create_db_and_tables
from app.models import (
    User, JobSeeker, Employer, Job, Application, 
    Conversation, Message, LearningProgress, Nationality
)
from datetime import datetime, timedelta
import json
import hashlib

# Simple password hashing for seeding
def hash_password(password: str) -> str:
    """Simple SHA256 hash for development seed data"""
    return hashlib.sha256(password.encode()).hexdigest()


def seed_data():
    """Seed database with test data"""
    create_db_and_tables()
    
    with Session(engine) as session:
        # Clear existing data (optional)
        print("Seeding database...")
        
        # Create Nationalities
        nationalities = [
            # Asia
            Nationality(code="AF", name="افغانستان (Afghanistan)", phone_code="+93"),
            Nationality(code="AM", name="Հայաստան (Armenia)", phone_code="+374"),
            Nationality(code="AZ", name="Azərbaycan (Azerbaijan)", phone_code="+994"),
            Nationality(code="BH", name="البحرين‎ (Bahrain)", phone_code="+973"),
            Nationality(code="BD", name="বাংলাদেশ (Bangladesh)", phone_code="+880"),
            Nationality(code="BT", name="འབྲུག་ཡུལ་ (Bhutan)", phone_code="+975"),
            Nationality(code="BN", name="Brunei Darussalam", phone_code="+673"),
            Nationality(code="KH", name="កម្ពុជា (Cambodia)", phone_code="+855"),
            Nationality(code="CN", name="中国 / 中國 (China)", phone_code="+86"),
            Nationality(code="CY", name="Κύπρος / Kıbrıs (Cyprus)", phone_code="+357"),
            Nationality(code="GE", name="საქართველო (Georgia)", phone_code="+995"),
            Nationality(code="IN", name="भारत (India)", phone_code="+91"),
            Nationality(code="ID", name="Indonesia", phone_code="+62"),
            Nationality(code="IR", name="ایران (Iran)", phone_code="+98"),
            Nationality(code="IQ", name="العراق (Iraq)", phone_code="+964"),
            Nationality(code="IL", name="ישראל (Israel)", phone_code="+972"),
            Nationality(code="JP", name="日本 (Japan)", phone_code="+81"),
            Nationality(code="JO", name="الأردن (Jordan)", phone_code="+962"),
            Nationality(code="KZ", name="Қазақстан (Kazakhstan)", phone_code="+7"),
            Nationality(code="KW", name="الكويت‎ (Kuwait)", phone_code="+965"),
            Nationality(code="KG", name="Кыргызстан (Kyrgyzstan)", phone_code="+996"),
            Nationality(code="LA", name="ສປປລາວ (Lao PDR)", phone_code="+856"),
            Nationality(code="LB", name="لبنان (Lebanon)", phone_code="+961"),
            Nationality(code="MY", name="Malaysia", phone_code="+60"),
            Nationality(code="MV", name="ދިވެހި (Maldives)", phone_code="+960"),
            Nationality(code="MN", name="Монгол улс (Mongolia)", phone_code="+976"),
            Nationality(code="MM", name="မြန်မာ (Myanmar)", phone_code="+95"),
            Nationality(code="NP", name="नेपाल (Nepal)", phone_code="+977"),
            Nationality(code="KP", name="조선민주주의인민공화국 (North Korea)", phone_code="+850"),
            Nationality(code="OM", name="عُمان‎ (Oman)", phone_code="+968"),
            Nationality(code="PK", name="پاکستان (Pakistan)", phone_code="+92"),
            Nationality(code="PS", name="فلسطين (Palestine)", phone_code="+970"),
            Nationality(code="PH", name="Pilipinas (Philippines)", phone_code="+63"),
            Nationality(code="QA", name="قطر‎ (Qatar)", phone_code="+974"),
            Nationality(code="SA", name="السعودية‎ (Saudi Arabia)", phone_code="+966"),
            Nationality(code="SG", name="Singapore", phone_code="+65"),
            Nationality(code="KR", name="대한민국 (South Korea)", phone_code="+82"),
            Nationality(code="LK", name="ශ්‍රී ලංකාව (Sri Lanka)", phone_code="+94"),
            Nationality(code="SY", name="سورية (Syria)", phone_code="+963"),
            Nationality(code="TW", name="臺灣 / 台灣 (Taiwan)", phone_code="+886"),
            Nationality(code="TJ", name="Тоҷикистон (Tajikistan)", phone_code="+992"),
            Nationality(code="TH", name="ประเทศไทย (Thailand)", phone_code="+66"),
            Nationality(code="TR", name="Türkiye (Turkey)", phone_code="+90"),
            Nationality(code="TM", name="Türkmenistan", phone_code="+993"),
            Nationality(code="AE", name="الإمارات العربية المتحدة‎ (UAE)", phone_code="+971"),
            Nationality(code="UZ", name="O'zbekiston (Uzbekistan)", phone_code="+998"),
            Nationality(code="VN", name="Việt Nam (Vietnam)", phone_code="+84"),
            Nationality(code="YE", name="اليمن‎ (Yemen)", phone_code="+967"),
            
            # Europe
            Nationality(code="AL", name="Shqipëri (Albania)", phone_code="+355"),
            Nationality(code="AT", name="Österreich (Austria)", phone_code="+43"),
            Nationality(code="BY", name="Беларусь (Belarus)", phone_code="+375"),
            Nationality(code="BE", name="Belgique / België (Belgium)", phone_code="+32"),
            Nationality(code="BA", name="Bosna i Hercegovina", phone_code="+387"),
            Nationality(code="BG", name="България (Bulgaria)", phone_code="+359"),
            Nationality(code="HR", name="Hrvatska (Croatia)", phone_code="+385"),
            Nationality(code="CZ", name="Česká republika (Czechia)", phone_code="+420"),
            Nationality(code="DK", name="Danmark (Denmark)", phone_code="+45"),
            Nationality(code="EE", name="Eesti (Estonia)", phone_code="+372"),
            Nationality(code="FI", name="Suomi (Finland)", phone_code="+358"),
            Nationality(code="FR", name="France", phone_code="+33"),
            Nationality(code="DE", name="Deutschland (Germany)", phone_code="+49"),
            Nationality(code="GR", name="Ελλάδα (Greece)", phone_code="+30"),
            Nationality(code="HU", name="Magyarország (Hungary)", phone_code="+36"),
            Nationality(code="IS", name="Ísland (Iceland)", phone_code="+354"),
            Nationality(code="IE", name="Éire (Ireland)", phone_code="+353"),
            Nationality(code="IT", name="Italia (Italy)", phone_code="+39"),
            Nationality(code="LV", name="Latvija", phone_code="+371"),
            Nationality(code="LI", name="Liechtenstein", phone_code="+423"),
            Nationality(code="LT", name="Lietuva", phone_code="+370"),
            Nationality(code="LU", name="Lëtzebuerg (Luxembourg)", phone_code="+352"),
            Nationality(code="MK", name="Северна Македонија (N. Macedonia)", phone_code="+389"),
            Nationality(code="MT", name="Malta", phone_code="+356"),
            Nationality(code="MD", name="Moldova", phone_code="+373"),
            Nationality(code="MC", name="Monaco", phone_code="+377"),
            Nationality(code="ME", name="Crna Gora (Montenegro)", phone_code="+382"),
            Nationality(code="NL", name="Nederland", phone_code="+31"),
            Nationality(code="NO", name="Norge", phone_code="+47"),
            Nationality(code="PL", name="Polska", phone_code="+48"),
            Nationality(code="PT", name="Portugal", phone_code="+351"),
            Nationality(code="RO", name="România", phone_code="+40"),
            Nationality(code="RU", name="Россия (Russia)", phone_code="+7"),
            Nationality(code="RS", name="Србија (Serbia)", phone_code="+381"),
            Nationality(code="SK", name="Slovensko", phone_code="+421"),
            Nationality(code="SI", name="Slovenija", phone_code="+386"),
            Nationality(code="ES", name="España", phone_code="+34"),
            Nationality(code="SE", name="Sverige", phone_code="+46"),
            Nationality(code="CH", name="Schweiz / Suisse / Svizzera", phone_code="+41"),
            Nationality(code="UA", name="Україна (Ukraine)", phone_code="+380"),
            Nationality(code="GB", name="United Kingdom", phone_code="+44"),
            
            # Africa
            Nationality(code="DZ", name="الجزائر‎ (Algeria)", phone_code="+213"),
            Nationality(code="BJ", name="Bénin", phone_code="+229"),
            Nationality(code="BW", name="Botswana", phone_code="+267"),
            Nationality(code="BF", name="Burkina Faso", phone_code="+226"),
            Nationality(code="BI", name="Burundi", phone_code="+257"),
            Nationality(code="CM", name="Cameroun", phone_code="+237"),
            Nationality(code="CV", name="Cabo Verde", phone_code="+238"),
            Nationality(code="CF", name="République centrafricaine", phone_code="+236"),
            Nationality(code="TD", name="Tchad", phone_code="+235"),
            Nationality(code="KM", name="جزر القمر‎ (Comoros)", phone_code="+56"),
            Nationality(code="CD", name="Congo-Kinshasa", phone_code="+243"),
            Nationality(code="CG", name="Congo-Brazzaville", phone_code="+242"),
            Nationality(code="DJ", name="جيبوتي‎ (Djibouti)", phone_code="+253"),
            Nationality(code="EG", name="مصر‎ (Egypt)", phone_code="+20"),
            Nationality(code="GQ", name="Guinea Ecuatorial", phone_code="+240"),
            Nationality(code="ER", name="ኤርትራ (Eritrea)", phone_code="+291"),
            Nationality(code="ET", name="ኢትዮጵያ (Ethiopia)", phone_code="+251"),
            Nationality(code="GA", name="Gabon", phone_code="+241"),
            Nationality(code="GM", name="The Gambia", phone_code="+220"),
            Nationality(code="GH", name="Ghana", phone_code="+233"),
            Nationality(code="GN", name="Guinée", phone_code="+224"),
            Nationality(code="GW", name="Guiné-Bissau", phone_code="+245"),
            Nationality(code="CI", name="Côte d'Ivoire", phone_code="+225"),
            Nationality(code="KE", name="Kenya", phone_code="+254"),
            Nationality(code="LS", name="Lesotho", phone_code="+266"),
            Nationality(code="LY", name="ليبيا‎ (Libya)", phone_code="+218"),
            Nationality(code="MG", name="Madagasikara", phone_code="+261"),
            Nationality(code="MW", name="Malawi", phone_code="+265"),
            Nationality(code="ML", name="Mali", phone_code="+223"),
            Nationality(code="MR", name="موريتانيا‎ (Mauritania)", phone_code="+222"),
            Nationality(code="MU", name="Mauritius", phone_code="+230"),
            Nationality(code="MA", name="المغرب‎ (Morocco)", phone_code="+212"),
            Nationality(code="MZ", name="Moçambique", phone_code="+258"),
            Nationality(code="NA", name="Namibia", phone_code="+264"),
            Nationality(code="NE", name="Niger", phone_code="+227"),
            Nationality(code="NG", name="Nigeria", phone_code="+234"),
            Nationality(code="RW", name="Rwanda", phone_code="+250"),
            Nationality(code="ST", name="São Tomé e Príncipe", phone_code="+239"),
            Nationality(code="SN", name="Sénégal", phone_code="+221"),
            Nationality(code="SC", name="Seychelles", phone_code="+248"),
            Nationality(code="SL", name="Sierra Leone", phone_code="+232"),
            Nationality(code="SO", name="Soomaaliya (Somalia)", phone_code="+252"),
            Nationality(code="ZA", name="South Africa", phone_code="+27"),
            Nationality(code="SD", name="السودان‎ (Sudan)", phone_code="+249"),
            Nationality(code="TZ", name="Tanzania", phone_code="+255"),
            Nationality(code="TG", name="Togo", phone_code="+228"),
            Nationality(code="TN", name="تونس‎ (Tunisia)", phone_code="+216"),
            Nationality(code="UG", name="Uganda", phone_code="+256"),
            Nationality(code="ZM", name="Zambia", phone_code="+260"),
            Nationality(code="ZW", name="Zimbabwe", phone_code="+263"),
            
            # Americas
            Nationality(code="US", name="USA (United States)", phone_code="+1"),
            Nationality(code="CA", name="Canada (English/French)", phone_code="+1"),
            Nationality(code="MX", name="México", phone_code="+52"),
            Nationality(code="GT", name="Guatemala", phone_code="+502"),
            Nationality(code="SV", name="El Salvador", phone_code="+503"),
            Nationality(code="HN", name="Honduras", phone_code="+504"),
            Nationality(code="NI", name="Nicaragua", phone_code="+505"),
            Nationality(code="CR", name="Costa Rica", phone_code="+506"),
            Nationality(code="PA", name="Panamá", phone_code="+507"),
            Nationality(code="PE", name="Perú", phone_code="+51"),
            Nationality(code="CO", name="Colombia", phone_code="+57"),
            Nationality(code="VE", name="Venezuela", phone_code="+58"),
            Nationality(code="BR", name="Brasil", phone_code="+55"),
            Nationality(code="AR", name="Argentina", phone_code="+54"),
            Nationality(code="CL", name="Chile", phone_code="+56"),
            Nationality(code="PY", name="Paraguay", phone_code="+595"),
            Nationality(code="UY", name="Uruguay", phone_code="+598"),
            Nationality(code="BO", name="Bolivia", phone_code="+591"),
            Nationality(code="EC", name="Ecuador", phone_code="+593"),
            Nationality(code="GY", name="Guyana", phone_code="+592"),
            Nationality(code="GF", name="Guyane", phone_code="+594"),
            Nationality(code="SR", name="Suriname", phone_code="+597"),
            Nationality(code="JM", name="Jamaica", phone_code="+1-876"),
            Nationality(code="TT", name="Trinidad & Tobago", phone_code="+1-868"),
            Nationality(code="BB", name="Barbados", phone_code="+1-246"),
            Nationality(code="DM", name="Dominica", phone_code="+1-767"),
            Nationality(code="DO", name="República Dominicana", phone_code="+1-809"),
            Nationality(code="CU", name="Cuba", phone_code="+53"),
            Nationality(code="BM", name="Bermuda", phone_code="+1-441"),
            
            # Oceania
            Nationality(code="AU", name="Australia", phone_code="+61"),
            Nationality(code="NZ", name="Aotearoa (New Zealand)", phone_code="+64"),
            Nationality(code="FJ", name="Fiji", phone_code="+679"),
            Nationality(code="PG", name="Papua Niugini (Papua New Guinea)", phone_code="+675"),
            Nationality(code="CK", name="Cook Islands", phone_code="+682"),
            Nationality(code="NU", name="Niue", phone_code="+683"),
            Nationality(code="WS", name="Samoa", phone_code="+685"),
            Nationality(code="KI", name="Kiribati", phone_code="+686"),
            Nationality(code="NC", name="Nouvelle-Calédonie (New Caledonia)", phone_code="+687"),
            Nationality(code="TV", name="Tuvalu", phone_code="+688"),
            Nationality(code="PF", name="Polynésie française", phone_code="+689"),
            Nationality(code="TK", name="Tokelau", phone_code="+690"),
            Nationality(code="FM", name="Micronesia", phone_code="+691"),
            Nationality(code="MH", name="Marshall Islands", phone_code="+692"),
        ]
        for nationality in nationalities:
            # Check if exists, if not add
            existing = session.get(Nationality, nationality.code)
            if not existing:
                session.add(nationality)
        session.commit()  # Commit nationalities immediately
        print("✅ Nationalities seeded")
        
        # Create JobSeekers
        seekers = [
            JobSeeker(
                id="seeker-1",
                name="수정",
                nationality="베트남",
                phone="010-1234-5678",
                languageLevel="TOPIK 2급",
                visaType="D-2",
                availability="주말",
                experience=json.dumps([
                    {"role": "카페 바리스타", "years": 1, "tags": ["서비스", "음료제조"]}
                ]),
                preferences=json.dumps({
                    "industries": ["음식점", "카페"],
                    "wageRange": {"min": 10000, "max": 15000},
                    "area": "종로구",
                    "radiusKm": 5,
                    "preferDays": ["토", "일"]
                })
            ),
            JobSeeker(
                id="seeker-2",
                name="민준",
                nationality="중국",
                phone="010-2345-6789",
                languageLevel="TOPIK 3급",
                visaType="D-4",
                availability="평일 야간",
                experience=json.dumps([]),
                preferences=json.dumps({
                    "industries": ["편의점", "배달"],
                    "wageRange": {"min": 9500, "max": 12000},
                    "area": "중구",
                    "radiusKm": 3,
                    "preferDays": ["월", "수", "금"]
                })
            ),
        ]
        
        for seeker in seekers:
            session.add(seeker)
        
        # Create Employers
        employers = [
            Employer(
                id="employer-1",
                businessNo="123-45-67890",
                shopName="이태원 농담",
                industry="음식점 (파스타 전문)",
                address="서울 용산구 녹사평대로32길 3 2층",
                openHours="11:00-22:00",
                contact="02-1234-5678",
                media=json.dumps([]),
                minLanguageLevel="TOPIK 3급",
                needVisa=json.dumps(["비자-C-4"]),
                baseWage=12000,
                schedule="주 2일, 6시간",
                rating=4.6
            ),
            Employer(
                id="employer-2",
                businessNo="234-56-78901",
                shopName="왕십리 스타벅스",
                industry="카페",
                address="서울 성동구 왕십리로 123",
                openHours="07:00-22:00",
                contact="02-2345-6789",
                media=json.dumps([]),
                minLanguageLevel="TOPIK 2급",
                needVisa=json.dumps(["D-2", "D-4"]),
                baseWage=11000,
                schedule="주 3일, 4시간",
                rating=4.3
            ),
            Employer(
                id="employer-3",
                businessNo="345-67-89012",
                shopName="카페 파트타이머 구인",
                industry="카페",
                address="서울 성동구 행당로 45",
                openHours="08:00-20:00",
                contact="010-3456-7890",
                media=json.dumps([]),
                minLanguageLevel="TOPIK 3급",
                needVisa=json.dumps(["D-2"]),
                baseWage=12000,
                schedule="협의",
                rating=4.5
            ),
            Employer(
                id="employer-4",
                businessNo="456-78-90123",
                shopName="홀서빙 파트타이머 구인",
                industry="음식점",
                address="서울 용산구 이태원로 234",
                openHours="10:00-23:00",
                contact="010-4567-8901",
                media=json.dumps([]),
                minLanguageLevel="TOPIK 2급",
                needVisa=json.dumps(["비자-C-4"]),
                baseWage=13300,
                schedule="주말",
                rating=4.2
            ),
        ]
        
        for employer in employers:
            session.add(employer)
        
        # Create Jobs
        deadline_dates = [
            (datetime.now() + timedelta(days=8)).isoformat(),
            (datetime.now() + timedelta(days=12)).isoformat(),
            (datetime.now() + timedelta(days=5)).isoformat(),
            (datetime.now() + timedelta(days=15)).isoformat(),
        ]
        
        jobs = [
            Job(
                id="job-1",
                employerId="employer-1",
                title="카페 파트타이머 구인",
                description="친절하고 책임감 있는 파트타이머를 구합니다.",
                category="카페/음료",
                wage=12000,
                workDays="주 2일",
                workHours="시간, 요일 협의",
                deadline=deadline_dates[0],
                positions=2,
                requiredLanguage="TOPIK 3급",
                requiredVisa=json.dumps(["비자-C-4"]),
                benefits="인근 거주 우대, 영어 가능자 우대",
                employerMessage="저희 가게는 깨끗하고 친절한 분위기 손님들도 좋습니다. 청결하고 격려합 훈련을 잘 해줄 것입니다.",
            ),
            Job(
                id="job-2",
                employerId="employer-2",
                title="홀서빙 파트타이머 구인",
                description="주말 근무 가능한 분을 찾습니다.",
                category="음식점",
                wage=13300,
                workDays="주말",
                workHours="10:00-17:00",
                deadline=deadline_dates[1],
                positions=1,
                requiredLanguage="TOPIK 2급",
                requiredVisa=json.dumps(["비자-C-4"]),
                benefits="식사 제공",
                employerMessage="밝고 성실한 분이면 좋겠습니다!",
            ),
            Job(
                id="job-3",
                employerId="employer-3",
                title="카페 파트타이머 구인",
                description="카페 경험자 우대합니다.",
                category="카페",
                wage=12000,
                workDays="평일",
                workHours="14:00-19:00",
                deadline=deadline_dates[2],
                positions=2,
                requiredLanguage="TOPIK 3급",
                requiredVisa=json.dumps(["D-2"]),
            ),
            Job(
                id="job-4",
                employerId="employer-4",
                title="편의점 야간 알바",
                description="야간 근무 가능한 분을 모집합니다.",
                category="편의점",
                wage=11500,
                workDays="주 4일",
                workHours="22:00-06:00",
                deadline=deadline_dates[3],
                positions=1,
                requiredLanguage="TOPIK 2급",
                requiredVisa=json.dumps(["D-2", "D-4"]),
                benefits="야간수당 별도",
            ),
        ]
        
        for job in jobs:
            session.add(job)
        
        # Create Users
        users = [
            User(
                id="user-seeker-1",
                email="seeker1@example.com",
                hashedPassword=hash_password("password123"),
                role="jobseeker",
                profileId="seeker-1"
            ),
            User(
                id="user-employer-1",
                email="employer1@example.com",
                hashedPassword=hash_password("password123"),
                role="employer",
                profileId="employer-1"
            ),
        ]
        
        for user in users:
            session.add(user)
        
        # Create Learning Progress
        learning = LearningProgress(
            id="learn-1",
            seekerId="seeker-1",
            currentLevel="한국어 입문",
            completedLessons=3,
            totalLessons=6,
            progressPercent=65
        )
        session.add(learning)
        
        # Commit all
        session.commit()
        print("✅ Database seeded successfully!")
        print("\nTest accounts:")
        print("  Jobseeker: seeker1@example.com / password123")
        print("  Employer: employer1@example.com / password123")


if __name__ == "__main__":
    seed_data()

