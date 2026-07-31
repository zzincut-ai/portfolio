// 기능: 카테고리 필터링 및 패럴랙스 인터랙션

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Portfolio Data
    // 1. CORS 대비용 백업 데이터 (로컬 file:/// 프로토콜 등으로 JSON 로드 실패 시 적용)
    const backupData = [
        {
                "category": "로컬 브랜드 & B2B",
                "title": "찐컷이 만들면 다르다",
                "description": "AI 기술을 활용해 제작한 고화질 비디오 콘텐츠입니다.",
                "url": "https://www.youtube.com/embed/vmFhFigiCFg",
                "type": "vertical",
                "thumbnailTime": 14
        },
        {
                "category": "패션 & 라이프스타일",
                "title": "비트를 입은 AI 런웨이, ZZINSINSA",
                "description": "경쾌한 리듬과 AI의 유연한 무빙을 결합하여 브랜드의 트렌디한 에너지를 역동적인 한 장면으로 담아냈습니다.",
                "url": "https://www.youtube.com/embed/PnkucL3sZdM",
                "type": "horizontal"
        },
        {
                "category": "F&B & 프랜차이즈",
                "title": "오감을 깨우는 바삭함의 미학, 찐컷 치킨",
                "description": "AI 기술로 구현한 입체적인 질감 표현을 통해 찰나의 바삭함을 감각적인 브랜딩 영상으로 완성했습니다.",
                "url": "https://www.youtube.com/embed/AaniZWiMDRI",
                "type": "horizontal"
        },
        {
                "category": "패션 & 라이프스타일",
                "title": "복싱 – 움직임을 담다",
                "description": "복싱의 역동적인 움직임을 AI 영상으로 표현한 콘텐츠.",
                "url": "https://www.youtube.com/embed/ZCTgYag2y2g",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "SIF – 차량 연료 절감기",
                "description": "SIF가 추구하는 방향성을 인터뷰로 풀어냅니다.",
                "url": "https://www.youtube.com/embed/S8xi5a90hqo",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "우드팸 – 우트콤",
                "description": "실제 촬영, 연출, 기획 및 편집 과정을 거쳐 제작된 우드팸(우드+시트콤) 브랜드 예능 콘텐츠입니다.",
                "url": "https://www.youtube.com/embed/ZXe3JHFrp5c",
                "type": "vertical"
        },
        {
                "category": "실제 촬영/편집",
                "title": "우드팸 – 나무로 삶을 만드는 사람들",
                "description": "우드팸의 작업 방식과 철학을 통해, 나무라는 재료로 삶을 만들어가는 과정을 깊이 있게 담은 인터뷰.",
                "url": "https://www.youtube.com/embed/0OQb_pkeNL8",
                "type": "horizontal"
        },
        {
                "category": "로컬 브랜드 & B2B",
                "title": "사천 – 또 다른 도시의 시선",
                "description": "사천이라는 지역을 AI로 재해석한 감각적인 영상 콘텐츠.",
                "url": "https://www.youtube.com/embed/02IVutCarqo",
                "type": "vertical"
        },
        {
                "category": "패션 & 라이프스타일",
                "title": "병원 – 공간의 새로운 해석",
                "description": "병원이라는 공간을 재구성한 AI 영상 콘텐츠.",
                "url": "https://www.youtube.com/embed/yzzviBXeTKg",
                "type": "horizontal"
        },
        {
                "category": "F&B & 프랜차이즈",
                "title": "뉴욕 윤해운대갈비 – 전통의 재해석",
                "description": "한복과 해외로 진출한 국내음식점의 만남",
                "url": "https://www.youtube.com/embed/QRIqJb1VJKs",
                "type": "horizontal"
        },
        {
                "category": "F&B & 프랜차이즈",
                "title": "카페인중독 – 일상의 이야기",
                "description": "카페인중독 커피 프랜차이즈 애니메이션 광고",
                "url": "https://www.youtube.com/embed/LSGtgPO5qLo",
                "type": "vertical"
        },
        {
                "category": "로컬 브랜드 & B2B",
                "title": "시흥 – 일상을 담은 도시 콘텐츠",
                "description": "시흥의 일상적인 풍경을 AI 시각으로 풀어낸 영상.",
                "url": "https://www.youtube.com/embed/1kGmVTIOMzs",
                "type": "horizontal"
        },
        {
                "category": "패션 & 라이프스타일",
                "title": "두려움 – 내면을 표현하는 영상",
                "description": "두려움이라는 인간의 감정을 시각적으로 풀어낸 스토리형 AI 콘텐츠.",
                "url": "https://www.youtube.com/embed/C9QBfe0wI5E",
                "type": "horizontal"
        },
        {
                "category": "패션 & 라이프스타일",
                "title": "공허함 – 감정을 시각화하다",
                "description": "공허함이라는 감정을 AI 영상으로 풀어내며 공감과 몰입을 이끌어냅니다.",
                "url": "https://www.youtube.com/embed/dk1-bqjfWL0",
                "type": "vertical"
        },
        {
                "category": "실제 촬영/편집",
                "title": "부동산 소개– 실전 매물 브리핑 1편",
                "description": "실제 매물과 현장 정보, 그리고 실전에서 바로 활용 가능한 인사이트를 전달합니다.",
                "url": "https://www.youtube.com/embed/mXvJRO3mj5U",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "부동산 소개– 실전 매물 브리핑 2편",
                "description": "직접 현장을 방문해 전달하는 생생한 임장 스토리",
                "url": "https://www.youtube.com/embed/1qbjgIonn34",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "부동산 랭킹 – 한강뷰 아파트 TOP 3 분석",
                "description": "데이터와 시장 흐름을 기반으로 현재 가장 주목받는 지역을 순위로 정리하고, 그 이유와 투자 포인트를 쉽게 풀어냅니다.",
                "url": "https://www.youtube.com/embed/9LU42TYFUK0",
                "type": "vertical"
        },
        {
                "category": "실제 촬영/편집",
                "title": "부동산 임장 – 실제 매물의 가치 분석",
                "description": "아파트, 상가, 토지 등 다양한 매물을 소개하며 가격, 입지, 미래 가치를 객관적으로 분석합니다.",
                "url": "https://www.youtube.com/embed/jhMpoiXu3ak",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "부동산 임장 – 직접 가서 본 진짜 현장",
                "description": "직접 발로 뛰며 확인한 현장 분위기, 입지, 생활 환경을 현실적으로 전달하는 임장 콘텐츠.",
                "url": "https://www.youtube.com/embed/MhH5q3i7KHI",
                "type": "vertical"
        },
        {
                "category": "실제 촬영/편집",
                "title": "나무창작소 – 손끝에서 시작되는 이야기",
                "description": "나무창작소의 작업 공간과 카페로 변모하는 과정을 담은 인터뷰 콘텐츠.",
                "url": "https://www.youtube.com/embed/Xu79amFVE34",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "무빙포스터",
                "description": "AI 기술을 활용해 제작한 고화질 비디오 콘텐츠입니다.",
                "url": "https://www.youtube.com/embed/1hoOzHBC8L4",
                "type": "vertical"
        },
        {
                "category": "실제 촬영/편집",
                "title": "김소미 – 한 사람의 선택이 만든 길",
                "description": "김소미의 삶과 선택, 그리고 지금의 위치에 오기까지의 과정 and 생각을 진솔하게 담은 인터뷰.",
                "url": "https://www.youtube.com/embed/hWhLHxFVnDA",
                "type": "horizontal"
        },
        {
                "category": "실제 촬영/편집",
                "title": "Face ID – 타이포그래피",
                "description": "AI를 사용하지 않고 편집 Tool만 활용하여 제작",
                "url": "https://www.youtube.com/embed/vfbfMtzbboY",
                "type": "horizontal"
        }
];

    let portfolioData = [];
    const galleryContainer = document.getElementById('portfolio-gallery');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // JSON 동적 로드 함수 (CORS 에러 발생 시 백업 데이터로 대체)
    function loadPortfolioData() {
        fetch('assets/videos.json?v=' + new Date().getTime())
            .then(response => {
                if (!response.ok) throw new Error("JSON load failed");
                return response.json();
            })
            .then(data => {
                portfolioData = data;
                if (galleryContainer) renderPortfolio('ALL');
            })
            .catch(err => {
                console.warn("Using backup portfolio data (could be local browser view):", err);
                portfolioData = backupData;
                if (galleryContainer) renderPortfolio('ALL');
            });
    }

    const mobileLimit = 6; // 모바일/데스크탑 공통 초기에 보여줄 비디오 개수
    let nextItemIndex = 0;
    let activeFilteredData = [];
    let isForceAll = false;

    // 비디오 로드 오류로 카드가 숨겨질 때, 목록의 다음 영상을 당겨와서 6개를 유지하도록 함
    window.portfolioLoadNext = function() {
        if (isForceAll) return;
        if (nextItemIndex < activeFilteredData.length) {
            const item = activeFilteredData[nextItemIndex];
            nextItemIndex++;
            createAndAppendCard(item, nextItemIndex - 1);
        }
    };

    function getYoutubeId(url) {
        if (url.includes('embed/')) {
            return url.split('embed/')[1].split('?')[0];
        }
        return '';
    }

    function getCloudinaryThumbnail(videoUrl, thumbnailTime = 5) {
        // Cloudinary 비디오 URL을 썸네일 이미지 URL로 변환 (예: .mp4 -> .jpg 및 start offset 지정)
        let url = videoUrl.replace(/\.mp4$/i, '.jpg');
        if (url.includes('video/upload/')) {
            url = url.replace('video/upload/', `video/upload/so_${thumbnailTime}/`);
        }
        return url;
    }

    function createAndAppendCard(item, index) {
        const card = document.createElement('div');
        card.className = `portfolio-card neumorphic-card ${item.type}`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease';
        
        // 영상 경로 자동 분류 (Cloudinary vs Local MP4 vs YouTube)
        const isCloudinary = item.url.includes('res.cloudinary.com');
        const isLocalVideo = !isCloudinary && (item.url.toLowerCase().endsWith('.mp4') || item.url.includes('assets/videos/'));
        
        // 한글 인코딩 적용
        const videoSrc = (isLocalVideo || isCloudinary) ? encodeURI(item.url) : item.url;
        
        // 카드 그리드에서는 무거운 비디오 로딩을 방지하기 위해 썸네일(이미지)만 lazy load 방식으로 띄웁니다.
        let videoTag = '';
        if (isCloudinary) {
            const thumbTime = item.thumbnailTime || 5;
            const thumbnailUrl = getCloudinaryThumbnail(videoSrc, thumbTime);
            videoTag = `<div class="iframe-placeholder">
                           <img src="${thumbnailUrl}" alt="${item.title}" onerror="this.src='assets/images/저용량.png'">
                           <div class="play-overlay">
                               <svg viewBox="0 0 24 24" width="24" height="24">
                                   <path d="M8 5v14l11-7z"/>
                               </svg>
                           </div>
                       </div>`;
        } else if (isLocalVideo) {
            // 로컬 비디오 테스트를 위해 남겨두되, 404가 발생하면 오류 카드로 제거
            videoTag = `<video playsinline preload="metadata" onerror="this.closest('.portfolio-card').remove(); if(window.portfolioLoadNext) window.portfolioLoadNext();"></video>
                       <div class="play-overlay">
                           <svg viewBox="0 0 24 24" width="24" height="24">
                               <path d="M8 5v14l11-7z"/>
                           </svg>
                       </div>`;
        } else {
            // 유튜브 썸네일 활용 (최대 화질 maxresdefault.jpg 로딩 시도 후 단계별 fallback)
            const ytId = getYoutubeId(videoSrc);
            videoTag = `<div class="iframe-placeholder">
                           <img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" 
                                alt="${item.title}" 
                                onerror="if(this.src.includes('maxresdefault')) { this.src='https://img.youtube.com/vi/${ytId}/sddefault.jpg'; } else if(this.src.includes('sddefault')) { this.src='https://img.youtube.com/vi/${ytId}/hqdefault.jpg'; } else { this.src='assets/images/저용량.png'; }">
                           <div class="play-overlay">
                               <svg viewBox="0 0 24 24" width="24" height="24">
                                   <path d="M8 5v14l11-7z"/>
                               </svg>
                           </div>
                       </div>`;
        }

        card.innerHTML = `
            <div class="video-wrapper">
                ${videoTag}
            </div>
            <div class="card-info">
                <span class="portfolio-badge">${item.category}</span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;

        galleryContainer.appendChild(card);

        // DOM에 카드를 추가한 직후에 src를 세팅하여 로컬 테스트 비디오 onerror 대응
        if (isLocalVideo) {
            const videoEl = card.querySelector('video');
            if (videoEl) {
                const thumbTime = item.thumbnailTime || 5;
                videoEl.src = videoSrc + '#t=' + thumbTime;
            }
        }

        // 카드를 클릭하면 몰입형 라이트박스 팝업 플레이어를 엽니다.
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal(item);
        });
        
        // Stagger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50 * index);
    }

    const pinnedTitles = [
        "찐컷이 만들면 다르다",
        "카페인중독 – 일상의 이야기",
        "우드팸 – 우트콤",
        "비트를 입은 AI 런웨이, ZZINSINSA",
        "오감을 깨우는 바삭함의 미학, 찐컷 치킨",
        "Face ID – 타이포그래피"
    ];

    const categoryOrders = {
        "실제 촬영/편집": [
            "우드팸 – 나무로 삶을 만드는 사람들",
            "김소미 – 한 사람의 선택이 만든 길",
            "나무창작소 – 손끝에서 시작되는 이야기",
            "우드팸 – 우트콤",
            "부동산 임장 – 직접 가서 본 진짜 현장",
            "부동산 랭킹 – 한강뷰 아파트 TOP 3 분석",
            "부동산 임장 – 실제 매물의 가치 분석",
            "부동산 소개– 실전 매물 브리핑 1편",
            "부동산 소개– 실전 매물 브리핑 2편"
        ],
        "패션 & 라이프스타일": [
            "비트를 입은 AI 런웨이, ZZINSINSA",
            "복싱 – 움직임을 담다",
            "병원 – 공간의 새로운 해석",
            "공허함 – 감정을 시각화하다",
            "두려움 – 내면을 표현하는 영상"
        ]
    };

    function renderPortfolio(filterCategory = 'ALL', forceAll = false) {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        
        let filteredData = filterCategory === 'ALL' 
            ? [...portfolioData] 
            : portfolioData.filter(item => item.category === filterCategory);

        // ALL 탭의 경우에만 상단 6개 고정 정렬 로직 적용
        if (filterCategory === 'ALL') {
            const pinnedItems = [];
            const remainingItems = [];
            
            // 제목 매칭을 위한 임시 맵 생성
            const itemMap = {};
            filteredData.forEach(item => {
                itemMap[item.title.trim()] = item;
            });
            
            // 고정 순서대로 뽑아내기
            pinnedTitles.forEach(title => {
                if (itemMap[title]) {
                    pinnedItems.push(itemMap[title]);
                }
            });
            
            // 고정되지 않은 나머지 영상들 수집
            const pinnedSet = new Set(pinnedTitles);
            filteredData.forEach(item => {
                if (!pinnedSet.has(item.title.trim())) {
                    remainingItems.push(item);
                }
            });
            
            activeFilteredData = pinnedItems.concat(remainingItems);
        } else {
            // 개별 카테고리 탭 정렬 규칙 적용 (만약 지정된 순서가 있다면)
            const customOrder = categoryOrders[filterCategory];
            if (customOrder) {
                const orderedItems = [];
                const remainingItems = [];
                
                const itemMap = {};
                filteredData.forEach(item => {
                    itemMap[item.title.trim()] = item;
                });
                
                customOrder.forEach(title => {
                    if (itemMap[title]) {
                        orderedItems.push(itemMap[title]);
                    }
                });
                
                const orderSet = new Set(customOrder);
                filteredData.forEach(item => {
                    if (!orderSet.has(item.title.trim())) {
                        remainingItems.push(item);
                    }
                });
                
                activeFilteredData = orderedItems.concat(remainingItems);
            } else {
                // 기타 카테고리 탭은 최신순(자연스러운 데이터 순서) 그대로 유지
                activeFilteredData = filteredData;
            }
        }

        isForceAll = forceAll;
        const loadMoreContainer = document.getElementById('load-more-container');

        let initialLimit = activeFilteredData.length;
        if (filterCategory === 'ALL' && !forceAll && activeFilteredData.length > mobileLimit) {
            initialLimit = mobileLimit;
            if (loadMoreContainer) loadMoreContainer.style.display = 'block';
        } else {
            if (loadMoreContainer) loadMoreContainer.style.display = 'none';
        }

        nextItemIndex = initialLimit;

        for (let i = 0; i < initialLimit; i++) {
            createAndAppendCard(activeFilteredData[i], i);
        }
    }

    if (galleryContainer) {
        // 동적 로드 시작
        loadPortfolioData();

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPortfolio(btn.getAttribute('data-filter'));
            });
        });

        // 더 보기 버튼 클릭 이벤트
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                const activeBtn = document.querySelector('.filter-btn.active');
                const currentFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'ALL';
                renderPortfolio(currentFilter, true); // forceAll = true 로 재렌더링
            });
        }
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
    
    // 3. 몰입형 비디오 라이트박스 모달 기능 구현
    const modal = document.getElementById('video-modal');
    const modalVideoContainer = document.getElementById('modal-video-container');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');

    function openVideoModal(item) {
        if (!modal || !modalVideoContainer) return;
        
        modalVideoContainer.innerHTML = '';
        
        const isCloudinary = item.url.includes('res.cloudinary.com');
        const isLocalVideo = !isCloudinary && (item.url.toLowerCase().endsWith('.mp4') || item.url.includes('assets/videos/'));
        const videoSrc = (isLocalVideo || isCloudinary) ? encodeURI(item.url) : item.url;
        
        if (isLocalVideo || isCloudinary) {
            const video = document.createElement('video');
            video.src = videoSrc;
            video.controls = true;
            video.autoplay = true;
            video.playsinline = true;
            modalVideoContainer.appendChild(video);
        } else {
            const iframe = document.createElement('iframe');
            // 유튜브 자동 재생 및 브랜딩 바 제거 매개변수 주입
            const embedUrl = videoSrc.includes('?') 
                ? `${videoSrc}&autoplay=1&modestbranding=1&rel=0&iv_load_policy=3` 
                : `${videoSrc}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3`;
            iframe.src = embedUrl;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            modalVideoContainer.appendChild(iframe);
        }
        
        if (modalBadge) modalBadge.textContent = item.category;
        if (modalTitle) modalTitle.textContent = item.title;
        if (modalDesc) modalDesc.textContent = item.description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 방지
    }

    function closeVideoModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 뒷배경 스크롤 방지 해제
        
        // 재생 중이던 비디오 및 iframe 리소스를 소멸시켜 재생을 정지함
        if (modalVideoContainer) {
            modalVideoContainer.innerHTML = '';
        }
    }

    // 모달 닫기 이벤트 등록
    const closeBtn = document.getElementById('modal-close-btn');
    const backdrop = document.getElementById('modal-backdrop');
    if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);
    if (backdrop) backdrop.addEventListener('click', closeVideoModal);

    // ESC 키 입력 시 모달 닫기
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });

    // 4. 부드러운 앵커 스크롤링 기능
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
