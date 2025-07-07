// AOS 초기화
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 부드러운 스크롤 함수
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 네비게이션 링크 클릭 이벤트
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// 헤더 스크롤 효과
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(150, 4, 4, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #960404 0%, #960404 100%)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// 프로젝트 카드 호버 효과
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 수상작 카드 클릭 시 상세 정보 모달 (기본 구현)
document.querySelectorAll('.winner-card, .runner-up-card, .excellence-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    /*card.addEventListener('click', function() {
        // 실제 구현에서는 모달 창을 띄우거나 상세 페이지로 이동
        const projectName = this.querySelector('.project-name').textContent;
        const teamName = this.querySelector('.team-name').textContent;
        
        // 간단한 알림으로 대체 (실제로는 모달이나 상세 페이지 구현)
        showProjectDetails(projectName, teamName);
    });*/
});

// 프로젝트 상세 정보 표시 함수
function showProjectDetails(projectName, teamName) {
    // 실제 구현에서는 모달이나 별도 페이지로 구현
    alert(`${projectName}\n팀: ${teamName}\n\n상세 정보는 추후 업데이트 예정입니다.`);
}

// 숫자 카운터 애니메이션
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 50; // 50단계로 나누어 애니메이션
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('개월')) {
                    counter.textContent = Math.ceil(current) + '개월';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // 원래 텍스트 유지
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer를 사용한 스크롤 애니메이션
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // 통계 섹션에 도달하면 카운터 애니메이션 시작
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// 관찰할 요소들 등록
document.querySelectorAll('.winner-card, .runner-up-card, .excellence-card, .project-card, .stats').forEach(el => {
    observer.observe(el);
});

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 부드러운 애니메이션
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 히어로 섹션 타이핑 효과 (선택사항)
    typeWriter();
});

// 타이핑 효과 함수 (선택사항)
function typeWriter() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    const speed = 100; // 타이핑 속도 (ms)
    
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000); // 1초 후 타이핑 시작
}

// 검색 기능 (향후 확장용)
function searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    const winnerCards = document.querySelectorAll('.winner-card, .runner-up-card, .excellence-card');
    
    const allCards = [...projectCards, ...winnerCards];
    
    allCards.forEach(card => {
        const title = card.querySelector('.project-name, h4').textContent.toLowerCase();
        const team = card.querySelector('.team-name, .team-name').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || team.includes(query.toLowerCase())) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// 모바일 메뉴 토글 (추후 확장용)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// 다크 모드 토글 (향후 확장용)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// 페이지 로드 시 다크 모드 설정 복원
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// 스크롤 진행률 표시 (선택사항)
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// 폼 유효성 검사 (향후 문의 폼 추가 시 사용)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.length < 2) {
        errors.push('이름은 2글자 이상 입력해주세요.');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('올바른 이메일 주소를 입력해주세요.');
    }
    
    if (!formData.message || formData.message.length < 10) {
        errors.push('메시지는 10글자 이상 입력해주세요.');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 이미지 지연 로딩 (향후 실제 이미지 추가 시 사용)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 페이지 성능 최적화
function optimizePerformance() {
    // 이미지 압축 및 WebP 지원 확인
    function supportsWebP() {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    
    if (supportsWebP()) {
        document.body.classList.add('webp-support');
    }
    
    // 중요하지 않은 리소스 지연 로딩
    setTimeout(() => {
        lazyLoadImages();
    }, 1000);
}
