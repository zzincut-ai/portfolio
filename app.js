// 기능: 카테고리 필터링 및 패럴랙스 인터랙션

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Portfolio Data
    const portfolioData = [
        // AI & CREATIVE
        { category: "AI & CREATIVE", title: "복싱 – 움직임을 담다", description: "복싱의 역동적인 움직임을 AI 영상으로 표현한 콘텐츠.", url: "https://www.youtube.com/embed/dUi91I1OpOA", type: "vertical" },
        { category: "AI & CREATIVE", title: "시흥 – 일상을 담은 도시 콘텐츠", description: "시흥의 일상적인 풍경을 AI 시각으로 풀어낸 영상.", url: "https://www.youtube.com/embed/pzIvzKca8rc", type: "horizontal" },
        { category: "AI & CREATIVE", title: "카페인중독 – 일상의 이야기", description: "카페인중독 커피 프랜차이즈 애니메이션 광고", url: "https://www.youtube.com/embed/pz540Fgjv70", type: "vertical" },
        { category: "AI & CREATIVE", title: "Face ID – 타이포그래피", description: "AI를 사용하지 않고 편집 Tool만 활용하여 제작", url: "https://www.youtube.com/embed/3xeHvxL2_Pw", type: "horizontal" },
        { category: "AI & CREATIVE", title: "뉴욕 윤해운대갈비 – 전통의 재해석", description: "한복과 해외로 진출한 국내음식점의 만남", url: "https://www.youtube.com/embed/jW7mtyIjGAo", type: "horizontal" },
        { category: "AI & CREATIVE", title: "KAIA – AI 영상 제작의 시작", description: "KAIA 홍보 영상", url: "https://www.youtube.com/embed/nQj8YL3U7bI", type: "horizontal" },
        { category: "AI & CREATIVE", title: "강남 – 도시를 재해석한 AI 영상", description: "강남이라는 공간을 AI 시각으로 재구성해 감각적인 영상으로 표현합니다.", url: "https://www.youtube.com/embed/x8UOH0uo1Ec", type: "vertical" },
        { category: "AI & CREATIVE", title: "공허함 – 감정을 시각화하다", description: "공허함이라는 감정을 AI 영상으로 풀어내며 공감과 몰입을 이끌어냅니다.", url: "https://www.youtube.com/embed/H3WHmoiNJnU", type: "vertical" },
        { category: "AI & CREATIVE", title: "남원 – 지역을 담은 AI 콘텐츠", description: "남원의 분위기와 감성을 AI 영상으로 재해석한 콘텐츠.", url: "https://www.youtube.com/embed/abovwkVXTMA", type: "horizontal" },
        { category: "AI & CREATIVE", title: "두려움 – 내면을 표현하는 영상", description: "두려움이라는 인간의 감정을 시각적으로 풀어낸 스토리형 AI 콘텐츠.", url: "https://www.youtube.com/embed/61Buz68J5Mo", type: "horizontal" },
        { category: "AI & CREATIVE", title: "메가마트 – 브랜드를 재해석하다", description: "메가마트라는 공간과 브랜드를 AI로 새롭게 표현한 창의적인 영상.", url: "https://www.youtube.com/embed/vo-TGjBdIFQ", type: "vertical" },
        { category: "AI & CREATIVE", title: "모비스 – 산업과 AI의 만남", description: "모비스를 주제로 산업적인 요소를 AI 콘텐츠로 재구성합니다.", url: "https://www.youtube.com/embed/lc_nq8MsRJg", type: "horizontal" },
        { category: "AI & CREATIVE", title: "사천 – 또 다른 도시의 시선", description: "사천이라는 지역을 AI로 재해석한 감각적인 영상 콘텐츠.", url: "https://www.youtube.com/embed/6xP0VMiGtao", type: "vertical" },
        { category: "AI & CREATIVE", title: "병원 – 공간의 새로운 해석", description: "병원이라는 공간을 재구성한 AI 영상 콘텐츠.", url: "https://www.youtube.com/embed/_1UFfvK0FmA", type: "horizontal" },
        { category: "AI & CREATIVE", title: "화성 – 도시의 또 다른 얼굴", description: "화성 지역을 AI 시선으로 풀어낸 감각적인 영상 콘텐츠.", url: "https://www.youtube.com/embed/d3k7HZflKsY", type: "horizontal" },
        { category: "AI & CREATIVE", title: "뮤직비디오 – AI로 만든 음악", description: "AI 기술을 활용해 제작한 감각적인 뮤직비디오 콘텐츠.", url: "https://www.youtube.com/embed/lAEnqBtV_UA", type: "horizontal" },

        // INTERVIEW
        { category: "INTERVIEW", title: "우드팸 – 나무로 삶을 만드는 사람들", description: "우드팸의 작업 방식과 철학을 통해, 나무라는 재료로 삶을 만들어가는 과정을 깊이 있게 담은 인터뷰.", url: "https://www.youtube.com/embed/JvkJFu9R72M", type: "horizontal" },
        { category: "INTERVIEW", title: "SIF – 차량 연료 절감기", description: "SIF가 추구하는 방향성을 인터뷰로 풀어냅니다.", url: "https://www.youtube.com/embed/8Vx0xBU9F2c", type: "horizontal" },
        { category: "INTERVIEW", title: "김소미 – 한 사람의 선택이 만든 길", description: "김소미의 삶과 선택, 그리고 지금의 위치에 오기까지의 과정과 생각을 진솔하게 담은 인터뷰.", url: "https://www.youtube.com/embed/cfQSq4EwY5Q", type: "horizontal" },
        { category: "INTERVIEW", title: "나무창작소 – 손끝에서 시작되는 이야기", description: "나무창작소의 작업 공간과 카페로 변모하는 과정을 담은 인터뷰 콘텐츠.", url: "https://www.youtube.com/embed/IzlvW8q3NzE", type: "horizontal" },

        // REAL ESTATE
        { category: "REAL ESTATE", title: "부동산 랭킹 – 한간뷰 아파트 TOP 3 분석", description: "데이터와 시장 흐름을 기반으로 현재 가장 주목받는 지역을 순위로 정리하고, 그 이유와 투자 포인트를 쉽게 풀어냅니다.", url: "https://www.youtube.com/embed/Q6Mzo15akzc", type: "vertical" },
        { category: "REAL ESTATE", title: "부동산 임장 – 직접 가서 본 진짜 현장", description: "직접 발로 뛰며 확인한 현장 분위기, 입지, 생활 환경을 현실적으로 전달하는 임장 콘텐츠.", url: "https://www.youtube.com/embed/fAM5pHCDWBM", type: "horizontal" },
        { category: "REAL ESTATE", title: "부동산 임장 – 실제 매물의 가치 분석", description: "아파트, 상가, 토지 등 다양한 매물을 소개하며 가격, 입지, 미래 가치를 객관적으로 분석합니다.", url: "https://www.youtube.com/embed/4-gGp42r8kg", type: "horizontal" },
        { category: "REAL ESTATE", title: "부동산 소개– 실전 매물 브리핑 1편", description: "실제 매물과 현장 정보, 그리고 실전에서 바로 활용 가능한 인사이트를 전달합니다.", url: "https://www.youtube.com/embed/xNZMNyDjnGs", type: "vertical" },
        { category: "REAL ESTATE", title: "부동산 소개– 실전 매물 브리핑 2편", description: "직접 현장을 방문해 전달하는 생생한 임장 스토리", url: "https://www.youtube.com/embed/oGeeyzgJZ2Q", type: "vertical" },
        { category: "REAL ESTATE", title: "부동산 소개– 실전 매물 브리핑 3편", description: "부동산 시장 흐름과 투자 관점을 인터뷰 및 분석 형식으로 풀어냅니다.", url: "https://www.youtube.com/embed/oKqrlGlnl_U", type: "horizontal" },

        // Branded Content
        { category: "Branded Content", title: "정보성 – 브랜드 전문성을 알리는 콘텐츠", description: "업체의 전문성을 영상으로 쉽게 전달하는 콘텐츠", url: "https://www.youtube.com/embed/wAMAqoIh9mI", type: "vertical" },
        { category: "Branded Content", title: "정보성 – 브랜드 전문성을 알리는 콘텐츠", description: "업체의 전문성을 영상으로 쉽게 전달하는 콘텐츠", url: "https://www.youtube.com/embed/xl6DFG7-izs", type: "vertical" },
        { category: "Branded Content", title: "시트콤 – 재미난 소재를 활용한 브랜드 콘텐츠", description: "브랜드를 알리는 광고를 재밌게 풀어낸 콘텐츠", url: "https://www.youtube.com/embed/AXNpz8PxYks", type: "vertical" },
        { category: "Branded Content", title: "SIF – 촬영과 AI 영상의 결합", description: "클라이언트가 준 촬영 영상 + AI 영상. 하이브리드 콘텐츠 제작.", url: "https://www.youtube.com/embed/dIPFfOqXM_I", type: "vertical" }
    ];

    const galleryContainer = document.getElementById('portfolio-gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderPortfolio(filterCategory = 'ALL') {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        
        const filteredData = filterCategory === 'ALL' 
            ? portfolioData 
            : portfolioData.filter(item => item.category === filterCategory);

        filteredData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `portfolio-card neumorphic-card ${item.type}`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease';
            
            card.innerHTML = `
                <div class="video-wrapper">
                    <iframe src="${item.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="card-info">
                    <span class="portfolio-badge">${item.category}</span>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            `;
            galleryContainer.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }

    if (galleryContainer) {
        renderPortfolio('ALL');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPortfolio(btn.getAttribute('data-filter'));
            });
        });
    }

    // 2. Hero 섹션 3D 마우스 패럴랙스 (데스크탑 한정)
    const heroSection = document.getElementById('hero');
    const decors = document.querySelectorAll('.glass-card, .floating-orb');

    // 마우스가 움직일 때
    heroSection.addEventListener('mousemove', (e) => {
        if(window.innerWidth <= 900) return; // 모바일/태블릿 제외
        
        // 화면 중앙을 0,0으로 계산
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;

        decors.forEach((decor, index) => {
            // 속도를 다르게 주어 입체감 부여
            const speed = (index + 1) * 0.8;
            decor.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // 마우스가 떠났을 때 원상복귀
    heroSection.addEventListener('mouseleave', () => {
        decors.forEach(decor => {
            decor.style.transform = `translate(0px, 0px)`;
        });
    });
    
    // 3. 부드러운 앵커 스크롤링 기능
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
