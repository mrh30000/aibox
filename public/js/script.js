// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                console.log('搜索:', query);
                // 这里可以添加实际的搜索逻辑
                alert(`搜索功能开发中，搜索关键词: ${query}`);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // 标签页切换功能
    const tabs = document.querySelectorAll('.tab, .ranking-tab, .category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除同组内其他标签的active类
            const siblings = tab.parentElement.querySelectorAll('.tab, .ranking-tab, .category-tab');
            siblings.forEach(sibling => sibling.classList.remove('active'));

            // 为当前标签添加active类
            tab.classList.add('active');
        });
    });

    // 工具卡片点击事件
    const toolCards = document.querySelectorAll('.tool-card, .category-tool, .guide-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('点击了工具卡片:', card);
            // 这里可以添加跳转到详情页的逻辑
        });

        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', function() {
            card.style.cursor = 'pointer';
        });
    });

    // 导航菜单点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是下拉菜单，阻止默认行为
            if (link.querySelector('.dropdown-arrow')) {
                e.preventDefault();
                console.log('下拉菜单功能开发中');
            }
        });
    });

    // 语言切换功能
    const languageSwitch = document.querySelector('.language-switch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function() {
            console.log('语言切换功能开发中');
        });
    }

    // 页脚按钮点击事件
    const footerBtn = document.querySelector('.footer-btn');
    if (footerBtn) {
        footerBtn.addEventListener('click', function() {
            alert('合作申请功能开发中，请通过其他方式联系我们！');
        });
    }

    // 英雄区域按钮点击事件
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            // 滚动到新闻区域
            const newsSection = document.querySelector('.news-section');
            if (newsSection) {
                newsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 平滑滚动效果
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 添加滚动时的导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 向下滚动时添加阴影
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // 添加加载动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有卡片元素
    const animatedElements = document.querySelectorAll('.tool-card, .category-tool, .guide-card, .news-item, .project-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 工具函数：格式化数字
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// 工具函数：获取相对时间
function getRelativeTime(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        return '1天前';
    } else if (diffDays < 7) {
        return `${diffDays}天前`;
    } else if (diffDays < 30) {
        return `${Math.floor(diffDays / 7)}周前`;
    } else {
        return `${Math.floor(diffDays / 30)}个月前`;
    }
}
