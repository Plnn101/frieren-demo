(function () {
    var BOND_DATA = [
        { from: '芙丽莲', to: '辛美尔', relation: '被拯救者 · 永恒羁绊', text: '辛美尔是芙丽莲漫长生命中第一个真正改变她的人。十年前的旅途，她浑然不觉；十年后，她才在失去中领悟——那些被她忽略的温暖，才是最珍贵的魔法。辛美尔的死亡，成为了芙丽莲踏上新旅程的唯一理由。' },
        { from: '芙丽莲', to: '菲伦', relation: '师徒 · 传承', text: '菲伦是辛美尔托付给芙丽莲的弟子。在这段师徒关系中，芙丽莲第一次承担起"照顾"的责任。菲伦的认真、细腻与偶尔的生气，让芙丽莲学会了关心他人——这或许是辛美尔留给她最后的礼物。' },
        { from: '芙丽莲', to: '斯塔克', relation: '同行者 · 守护', text: '年轻的战士斯塔克加入了芙丽莲的旅途。他的勇气与稚嫩，让芙丽莲看到了当年勇者小队的影子。作为队伍中唯一的少年，他用行动证明：勇气不是无所畏惧，而是即便害怕也要前行。' },
        { from: '芙丽莲', to: '海塔', relation: '托付者 · 信赖', text: '僧侣海塔是辛美尔最信赖的伙伴，也是将菲伦托付给芙丽莲的人。海塔用自己的暮年，完成了两个时代之间的交接。他是连接芙丽莲过去与现在的温柔桥梁。' },
        { from: '芙丽莲', to: '艾森', relation: '同队战士 · 默契', text: '矮人战士艾森与芙丽莲同为勇者小队的一员。一个长寿精灵，一个长寿矮人，十年对他们都只是一瞬。艾森的沉默守护让芙丽莲理解了什么是不言而喻的关怀。' },
        { from: '芙丽莲', to: '芙拉姆', relation: '师徒 · 魔法启蒙', text: '大魔法使芙拉姆是芙丽莲的师父，也是传授她魔法之美的第一人。正是芙拉姆让芙丽莲相信，魔法不只是工具，更是一种感受世界的方式。芙丽莲对魔法的热爱，源自芙拉姆的那份执着。' }
    ];

    var TRACKS = [
        { name: 'OP「勇者」— YOASOBI', artist: '作曲：Ayase / 歌：ikura', src: 'audio/op-yuusha.mp3' },
        { name: 'ED「bliss」— milet', artist: '作曲：Toru/UTA / 歌：milet', src: 'audio/ed-bliss.mp3' },
        { name: 'OST「Beyond Journey\'s End」', artist: 'Evan Call', src: 'audio/ost-beyond.mp3' }
    ];

    var currentTrack = 0;
    var bgmAudio = document.getElementById('bgm');
    var playerAudio = null;
    var isBgmPlaying = false;

    function switchTab(tabId) {
        document.querySelectorAll('.page').forEach(function (p) {
            p.style.display = 'none';
        });
        var target = document.getElementById(tabId);
        if (target) {
            target.style.display = '';
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.querySelectorAll('.tab-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.tab === tabId);
        });
        if (tabId !== 'bonds') {
            closeBondPanel();
        }
    }

    document.querySelectorAll('.tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            switchTab(this.dataset.tab);
        });
    });

    var enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', function () {
            var cover = document.querySelector('.cover');
            if (cover) {
                var next = cover.nextElementSibling;
                if (next) {
                    next.scrollIntoView({ behavior: 'smooth' });
                }
            }
            if (bgmAudio && bgmAudio.src) {
                bgmAudio.play().then(function () {
                    isBgmPlaying = true;
                    updateBgmToggle();
                }).catch(function () {});
            }
        });
    }

    var bgmToggle = document.getElementById('bgmToggle');
    if (bgmToggle) {
        bgmToggle.addEventListener('click', function () {
            if (!bgmAudio) return;
            if (isBgmPlaying) {
                bgmAudio.pause();
                isBgmPlaying = false;
            } else {
                bgmAudio.play().then(function () {
                    isBgmPlaying = true;
                }).catch(function () {});
            }
            updateBgmToggle();
        });
    }

    function updateBgmToggle() {
        if (!bgmToggle) return;
        var onIcon = bgmToggle.querySelector('.icon-music-on');
        var offIcon = bgmToggle.querySelector('.icon-music-off');
        if (isBgmPlaying) {
            bgmToggle.classList.add('playing');
            if (onIcon) onIcon.style.display = '';
            if (offIcon) offIcon.style.display = 'none';
        } else {
            bgmToggle.classList.remove('playing');
            if (onIcon) onIcon.style.display = 'none';
            if (offIcon) offIcon.style.display = '';
        }
    }

    document.querySelectorAll('.flip-card').forEach(function (card) {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });

    document.querySelectorAll('.hub-node').forEach(function (node) {
        node.addEventListener('click', function () {
            var bondIdx = parseInt(this.dataset.bond, 10);
            if (!isNaN(bondIdx)) {
                openBondPanel(bondIdx);
            }
        });
    });

    function openBondPanel(idx) {
        var data = BOND_DATA[idx];
        if (!data) return;
        var panel = document.getElementById('bondPanel');
        if (!panel) return;
        panel.querySelector('.bond-detail-from').textContent = data.from;
        panel.querySelector('.bond-detail-to').textContent = data.to;
        panel.querySelector('.bond-detail-relation').textContent = data.relation;
        panel.querySelector('.bond-detail-text').textContent = data.text;
        panel.classList.add('show');
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelectorAll('.hub-node').forEach(function (n) {
            var nIdx = parseInt(n.dataset.bond, 10);
            n.classList.toggle('active', nIdx === idx);
        });
    }

    window.closeBondPanel = function () {
        var panel = document.getElementById('bondPanel');
        if (panel) {
            panel.classList.remove('show');
        }
        document.querySelectorAll('.hub-node.active').forEach(function (n) {
            n.classList.remove('active');
        });
    };

    var playBtn = document.getElementById('playBtn');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var progressFill = document.getElementById('progressFill');
    var currentTimeEl = document.getElementById('currentTime');
    var totalTimeEl = document.getElementById('totalTime');
    var trackNameEl = document.getElementById('trackName');
    var trackArtistEl = document.getElementById('trackArtist');
    var discEl = document.querySelector('.player-disc');

    function initPlayerAudio() {
        if (playerAudio) return;
        playerAudio = new Audio();
        playerAudio.preload = 'metadata';
        playerAudio.addEventListener('timeupdate', function () {
            if (!playerAudio.duration) return;
            var pct = (playerAudio.currentTime / playerAudio.duration) * 100;
            if (progressFill) progressFill.style.width = pct + '%';
            if (currentTimeEl) currentTimeEl.textContent = formatTime(playerAudio.currentTime);
        });
        playerAudio.addEventListener('loadedmetadata', function () {
            if (totalTimeEl) totalTimeEl.textContent = formatTime(playerAudio.duration);
        });
        playerAudio.addEventListener('ended', function () {
            nextTrack();
        });
    }

    function loadTrack(idx) {
        currentTrack = idx;
        var track = TRACKS[currentTrack];
        if (trackNameEl) trackNameEl.textContent = track.name;
        if (trackArtistEl) trackArtistEl.textContent = track.artist;
        if (playerAudio) {
            playerAudio.src = track.src;
            playerAudio.load();
        }
        if (progressFill) progressFill.style.width = '0%';
        if (currentTimeEl) currentTimeEl.textContent = '0:00';
        if (totalTimeEl) totalTimeEl.textContent = '0:00';
        document.querySelectorAll('.track-btn').forEach(function (b) {
            b.classList.toggle('active', parseInt(b.dataset.track, 10) === currentTrack);
        });
    }

    function togglePlay() {
        initPlayerAudio();
        if (!playerAudio.src || playerAudio.src === window.location.href) {
            loadTrack(currentTrack);
        }
        if (playerAudio.paused) {
            playerAudio.play().then(function () {
                if (playBtn) {
                    playBtn.querySelector('.icon-play').style.display = 'none';
                    playBtn.querySelector('.icon-pause').style.display = '';
                }
                if (discEl) discEl.classList.add('spinning');
            }).catch(function () {});
        } else {
            playerAudio.pause();
            if (playBtn) {
                playBtn.querySelector('.icon-play').style.display = '';
                playBtn.querySelector('.icon-pause').style.display = 'none';
            }
            if (discEl) discEl.classList.remove('spinning');
        }
    }

    function nextTrack() {
        var next = (currentTrack + 1) % TRACKS.length;
        loadTrack(next);
        if (playerAudio && !playerAudio.paused) {
            playerAudio.play().catch(function () {});
        }
    }

    function prevTrack() {
        var prev = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
        loadTrack(prev);
        if (playerAudio && !playerAudio.paused) {
            playerAudio.play().catch(function () {});
        }
    }

    function formatTime(sec) {
        if (isNaN(sec)) return '0:00';
        var m = Math.floor(sec / 60);
        var s = Math.floor(sec % 60);
        return m + ':' + (s < 10 ? '0' : '') + s;
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', nextTrack);
    if (prevBtn) prevBtn.addEventListener('click', prevTrack);

    var progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', function (e) {
            if (!playerAudio || !playerAudio.duration) return;
            var rect = progressBar.getBoundingClientRect();
            var ratio = (e.clientX - rect.left) / rect.width;
            playerAudio.currentTime = ratio * playerAudio.duration;
        });
    }

    document.querySelectorAll('.track-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var idx = parseInt(this.dataset.track, 10);
            initPlayerAudio();
            loadTrack(idx);
            playerAudio.play().then(function () {
                if (playBtn) {
                    playBtn.querySelector('.icon-play').style.display = 'none';
                    playBtn.querySelector('.icon-pause').style.display = '';
                }
                if (discEl) discEl.classList.add('spinning');
            }).catch(function () {});
        });
    });

    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(function (el) {
        animObserver.observe(el);
    });

    document.querySelectorAll('.tl-item').forEach(function (item, i) {
        item.classList.add(i % 2 === 0 ? 'fade-in-left' : 'fade-in-right');
        animObserver.observe(item);
    });

    document.querySelectorAll('.overview-card').forEach(function (card, i) {
        card.classList.add('fade-in');
        card.style.transitionDelay = (i * 0.08) + 's';
        animObserver.observe(card);
    });

    document.querySelectorAll('.flip-card').forEach(function (card, i) {
        card.classList.add('fade-in');
        card.style.transitionDelay = (i * 0.1) + 's';
        animObserver.observe(card);
    });

    document.querySelectorAll('.hub-node').forEach(function (node, i) {
        node.classList.add('fade-in');
        node.style.transitionDelay = (i * 0.08) + 's';
        animObserver.observe(node);
    });

    var cover = document.querySelector('.cover');
    if (cover) {
        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset;
            var coverH = cover.offsetHeight;
            if (scrollY < coverH) {
                var ratio = scrollY / coverH;
                var content = cover.querySelector('.cover-content');
                if (content) {
                    content.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                    content.style.opacity = 1 - ratio * 0.8;
                }
            }
        }, { passive: true });
    }

    switchTab('overview');
})();
