/**
 * AI-102 问答系统 - 核心应用逻辑
 */

// ============ 全局状态 ============
let questions = [];
let currentQuestionIndex = 0;
let progressData = {
    answers: {},          // { questionId: answer }
    startTime: null,
    lastViewedIndex: 0
};

const STORAGE_KEY = 'ai102_progress';

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    try {
        // 加载题目数据
        await loadQuestions();
        
        // 恢复进度
        loadProgress();
        
        // 如果有已保存的进度，显示恢复对话
        if (Object.keys(progressData.answers).length > 0) {
            showProgressDialog();
        } else {
            showMainState();
            loadQuestion(0);
        }
        
        // 绑定事件
        bindEvents();
        
    } catch (error) {
        console.error('初始化失败:', error);
        showError('加载失败，请刷新页面重试');
    }
}

// ============ 数据加载 ============
async function loadQuestions() {
    try {
        const response = await fetch('/data/questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        questions = await response.json();
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('题库数据格式错误或为空');
        }
    } catch (error) {
        console.error('加载题库失败:', error);
        throw new Error('无法加载题库数据，请确保 questions.json 文件存在');
    }
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        progressData = JSON.parse(saved);
        currentQuestionIndex = progressData.lastViewedIndex;
    } else {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
    }
}

function saveProgress() {
    progressData.lastViewedIndex = currentQuestionIndex;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
}

// ============ UI 状态管理 ============
function showLoadingState() {
    hideAllStates();
    document.getElementById('loadingState').style.display = 'flex';
}

function showMainState() {
    hideAllStates();
    document.getElementById('mainState').classList.remove('hidden');
}

function showCompletionState() {
    hideAllStates();
    document.getElementById('completionState').classList.remove('hidden');
    updateCompletionStats();
}

function showStatsState() {
    hideAllStates();
    document.getElementById('statsState').classList.remove('hidden');
    updateStatsView();
}

function hideAllStates() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('mainState').classList.add('hidden');
    document.getElementById('completionState').classList.add('hidden');
    document.getElementById('statsState').classList.add('hidden');
}

// ============ 题目显示 ============
function loadQuestion(index) {
    // 边界检查
    if (index >= questions.length) {
        showCompletionState();
        return;
    }
    
    if (index < 0) {
        index = 0;
    }
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    // 更新页头
    document.getElementById('questionNumber').textContent = `第 ${question.id} 题`;
    document.getElementById('progressText').textContent = `${index + 1} / ${questions.length}`;
    
    const progress = ((index + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // 显示题目内容
    document.getElementById('questionBackground').innerHTML = sanitizeHtml(question.background);
    document.getElementById('questionText').innerHTML = sanitizeHtml(question.title);
    
    // 清空选项
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    // 加载选项
    question.options.forEach((option, idx) => {
        const optionEl = createOptionElement(option, question.id);
        optionsContainer.appendChild(optionEl);
    });
    
    // 隐藏结果区
    document.getElementById('resultSection').classList.add('hidden');
    
    // 重置按钮状态
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    
    // 恢复之前的答案（如果有）
    const savedAnswer = progressData.answers[question.id];
    if (savedAnswer) {
        const savedAnswerLabels = savedAnswer.split('、').map(s => s.trim());
        const optionEls = document.querySelectorAll('.option');
        optionEls.forEach(el => {
            if (savedAnswerLabels.includes(el.dataset.label)) {
                el.classList.add('selected');
            }
        });
        document.getElementById('submitBtn').disabled = false;
    }
    
    // 更新侧边栏统计
    updateSidebar();
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

function createOptionElement(option, questionId) {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    optionEl.dataset.label = option.label;
    optionEl.dataset.questionId = questionId;
    
    const labelEl = document.createElement('span');
    labelEl.className = 'option-label';
    labelEl.textContent = option.label;
    
    const textEl = document.createElement('span');
    textEl.className = 'option-text';
    textEl.textContent = option.text;
    
    optionEl.appendChild(labelEl);
    optionEl.appendChild(textEl);
    
    // 点击事件
    optionEl.addEventListener('click', () => selectOption(optionEl));
    
    return optionEl;
}

function selectOption(optionEl) {
    const question = questions[currentQuestionIndex];
    const isMultiSelect = question.answer.includes('、') || question.answer.includes(',');
    
    if (isMultiSelect) {
        // 多选题：允许选择多个选项
        optionEl.classList.toggle('selected');
    } else {
        // 单选题：只能选一个
        document.querySelectorAll('.option').forEach(el => {
            el.classList.remove('selected');
        });
        optionEl.classList.add('selected');
    }
    
    // 只要有选项被选中，就启用提交按钮
    const hasSelected = document.querySelectorAll('.option.selected').length > 0;
    document.getElementById('submitBtn').disabled = !hasSelected;
}

// ============ 答题逻辑 ============
function submitAnswer() {
    const selectedOptions = Array.from(document.querySelectorAll('.option.selected'));
    if (selectedOptions.length === 0) {
        showError('请选择至少一个答案');
        return;
    }
    
    const question = questions[currentQuestionIndex];
    
    // 处理多选题和单选题
    let userAnswer;
    const isMultiSelect = question.answer.includes('、') || question.answer.includes(',');
    
    if (isMultiSelect) {
        // 多选题：获取所有选中的选项并排序
        const userAnswerArray = selectedOptions.map(el => el.dataset.label).sort();
        userAnswer = userAnswerArray.join('、');
    } else {
        // 单选题
        userAnswer = selectedOptions[0].dataset.label;
    }
    
    // 保存答案
    progressData.answers[question.id] = userAnswer;
    saveProgress();
    
    // 判断正错
    const correctAnswer = question.answer;
    let isCorrect;
    
    if (isMultiSelect) {
        // 多选题：排序后比较
        const correctAnswerArray = correctAnswer.split('、').sort();
        const userAnswerArray = userAnswer.split('、').sort();
        isCorrect = correctAnswerArray.join() === userAnswerArray.join();
    } else {
        // 单选题
        isCorrect = userAnswer === correctAnswer;
    }
    
    // 显示结果
    showResult(question, userAnswer, correctAnswer, isCorrect, isMultiSelect);
    
    // 禁用所有选项并高亮显示正确答案
    const correctAnswerLabels = correctAnswer.split('、').map(s => s.trim());
    document.querySelectorAll('.option').forEach(el => {
        el.disabled = true;
        const label = el.dataset.label;
        
        if (correctAnswerLabels.includes(label)) {
            // 这是正确答案之一
            el.classList.add('correct');
        }
        if (selectedOptions.includes(el) && !isCorrect && !correctAnswerLabels.includes(label)) {
            // 这是用户选中的但错误的选项
            el.classList.add('incorrect');
        }
    });
    
    // 隐藏提交按钮，显示下一题按钮
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.remove('hidden');
}

function showResult(question, userAnswer, correctAnswer, isCorrect, isMultiSelect) {
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.remove('hidden');
    
    // 设置状态
    const statusEl = document.getElementById('resultStatus');
    statusEl.className = 'result-status ' + (isCorrect ? 'correct' : 'incorrect');
    statusEl.textContent = isCorrect ? '✓ 正确！' : '✗ 错误';
    
    // 设置消息
    document.getElementById('resultMessage').textContent = isCorrect 
        ? '恭喜，答案正确！' 
        : '很遗憾，答案错误。';
    
    // 显示用户答案
    const userAnswerLabels = userAnswer.split('、').map(s => s.trim());
    const userAnswerText = userAnswerLabels
        .map(label => {
            const option = question.options.find(o => o.label === label);
            return option ? `${label}. ${option.text}` : label;
        })
        .join('\n');
    document.getElementById('userAnswer').textContent = userAnswerText;
    
    // 显示正确答案
    const correctAnswerLabels = correctAnswer.split('、').map(s => s.trim());
    const correctAnswerText = correctAnswerLabels
        .map(label => {
            const option = question.options.find(o => o.label === label);
            return option ? `${label}. ${sanitizeHtml(option.text)}` : label;
        })
        .join('\n');
    
    const correctAnswerHtml = correctAnswerLabels.length > 1
        ? `<div style="white-space: pre-wrap;">${correctAnswerText}</div>`
        : `<strong>${correctAnswerText}</strong>`;
    
    document.getElementById('correctAnswer').innerHTML = correctAnswerHtml;
    
    // 显示解析
    document.getElementById('explanation').innerHTML = sanitizeHtml(question.explanation);
    
    // 显示争议说明（如果有）
    const controversyBox = document.getElementById('controversyBox');
    if (question.controversy) {
        controversyBox.classList.remove('hidden');
        document.getElementById('controversy').innerHTML = sanitizeHtml(question.controversy);
    } else {
        controversyBox.classList.add('hidden');
    }
    
    // 滚动到结果区
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ============ 导航 ============
function nextQuestion() {
    if (currentQuestionIndex + 1 >= questions.length) {
        showCompletionState();
    } else {
        loadQuestion(currentQuestionIndex + 1);
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function jumpToQuestion(questionIndex) {
    if (questionIndex >= 0 && questionIndex < questions.length) {
        loadQuestion(questionIndex);
    } else {
        showError('题号无效');
    }
}

function jumpToErrorQuestion(questionId) {
    // 根据题目ID找到题目索引
    const questionIndex = questions.findIndex(q => q.id === questionId);
    
    if (questionIndex >= 0 && questionIndex < questions.length) {
        // 切换到主答题视图
        showMainState();
        // 加载该题
        loadQuestion(questionIndex);
        // 滚动到顶部
        window.scrollTo(0, 0);
    } else {
        showError('无法找到该题');
    }
}

// ============ 统计与进度 ============
function updateSidebar() {
    const answers = progressData.answers;
    const totalCount = questions.length;
    const answeredCount = Object.keys(answers).length;
    
    let correctCount = 0;
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            const correctAnswer = question.answer;
            const isMultiSelect = correctAnswer.includes('、') || correctAnswer.includes(',');
            
            let isCorrect;
            if (isMultiSelect) {
                const correctAnswerArray = correctAnswer.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                isCorrect = userAnswer === correctAnswer;
            }
            
            if (isCorrect) {
                correctCount++;
            }
        }
    });
    
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '-';
    
    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('answeredCount').textContent = answeredCount;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('correctRate').textContent = correctRate;
}

function updateCompletionStats() {
    const answers = progressData.answers;
    let correctCount = 0;
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            const correctAnswer = question.answer;
            const isMultiSelect = correctAnswer.includes('、') || correctAnswer.includes(',');
            
            let isCorrect;
            if (isMultiSelect) {
                const correctAnswerArray = correctAnswer.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                isCorrect = userAnswer === correctAnswer;
            }
            
            if (isCorrect) {
                correctCount++;
            }
        }
    });
    
    const answeredCount = Object.keys(answers).length;
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '0%';
    
    document.getElementById('finalCorrect').textContent = correctCount;
    document.getElementById('finalIncorrect').textContent = incorrectCount;
    document.getElementById('finalRate').textContent = correctRate;
}

function updateStatsView() {
    updateSidebar();
    
    const answers = progressData.answers;
    const totalCount = questions.length;
    const answeredCount = Object.keys(answers).length;
    
    let correctCount = 0;
    const errorQuestions = [];
    
    Object.entries(answers).forEach(([qId, userAnswer]) => {
        const question = questions.find(q => q.id == qId);
        if (question) {
            // 判断是否正确
            let isCorrect;
            const correctAnswer = question.answer;
            const isMultiSelect = correctAnswer.includes('、') || correctAnswer.includes(',');
            
            if (isMultiSelect) {
                // 多选题：排序后比较
                const correctAnswerArray = correctAnswer.split('、').map(s => s.trim()).sort();
                const userAnswerArray = userAnswer.split('、').map(s => s.trim()).sort();
                isCorrect = correctAnswerArray.join() === userAnswerArray.join();
            } else {
                // 单选题
                isCorrect = userAnswer === correctAnswer;
            }
            
            if (isCorrect) {
                correctCount++;
            } else {
                errorQuestions.push({
                    id: question.id,
                    userAnswer,
                    correctAnswer: question.answer,
                    title: question.title
                });
            }
        }
    });
    
    const incorrectCount = answeredCount - correctCount;
    const correctRate = answeredCount > 0 
        ? ((correctCount / answeredCount) * 100).toFixed(1) + '%'
        : '-';
    
    document.getElementById('statsTotalCount').textContent = totalCount;
    document.getElementById('statsAnsweredCount').textContent = answeredCount;
    document.getElementById('statsCorrectCount').textContent = correctCount;
    document.getElementById('statsIncorrectCount').textContent = incorrectCount;
    document.getElementById('statsCorrectRate').textContent = correctRate;
    
    // 显示错题列表
    const errorListContainer = document.getElementById('errorListContainer');
    if (errorQuestions.length > 0) {
        errorListContainer.classList.remove('hidden');
        const errorList = document.getElementById('errorList');
        errorList.innerHTML = '';
        
        errorQuestions.forEach(error => {
            const errorItem = document.createElement('div');
            errorItem.className = 'error-item';
            errorItem.style.cursor = 'pointer';
            
            const question = questions.find(q => q.id === error.id);
            
            // 处理多选和单选的答案显示
            const userAnswerLabels = error.userAnswer.split('、').map(s => s.trim());
            const userAnswerTexts = userAnswerLabels
                .map(label => {
                    const opt = question.options.find(o => o.label === label);
                    return opt ? `${label}. ${opt.text}` : label;
                })
                .join(' / ');
            
            const correctAnswerLabels = error.correctAnswer.split('、').map(s => s.trim());
            const correctAnswerTexts = correctAnswerLabels
                .map(label => {
                    const opt = question.options.find(o => o.label === label);
                    return opt ? `${label}. ${opt.text}` : label;
                })
                .join(' / ');
            
            errorItem.innerHTML = `
                <div class="error-item-title">第 ${error.id} 题</div>
                <div class="error-item-details">
                    <div class="error-detail">
                        <span class="error-detail-label">你的答案</span>
                        <span class="error-detail-value">${userAnswerTexts}</span>
                    </div>
                    <div class="error-detail">
                        <span class="error-detail-label">正确答案</span>
                        <span class="error-detail-value">${correctAnswerTexts}</span>
                    </div>
                </div>
            `;
            
            // 添加点击事件，导航到该错题
            errorItem.addEventListener('click', () => {
                jumpToErrorQuestion(error.id);
            });
            
            errorList.appendChild(errorItem);
        });
    } else {
        errorListContainer.classList.add('hidden');
    }
}

// ============ 事件绑定 ============
function bindEvents() {
    // 提交和下一题
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    
    // 侧边栏
    document.getElementById('viewStatsBtn').addEventListener('click', showStatsState);
    document.getElementById('reviewErrorsBtn').addEventListener('click', () => {
        showStatsState();
        document.getElementById('errorListContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('restartBtn').addEventListener('click', confirmRestart);
    
    // 题目导航
    document.getElementById('jumpBtn').addEventListener('click', () => {
        const input = document.getElementById('jumpInput');
        const qNum = parseInt(input.value);
        const qIndex = qNum - 1;
        if (isNaN(qNum) || qIndex < 0 || qIndex >= questions.length) {
            showError('请输入有效的题号 (1-' + questions.length + ')');
        } else {
            jumpToQuestion(qIndex);
            input.value = '';
        }
    });
    
    document.getElementById('jumpInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('jumpBtn').click();
        }
    });
    
    // 完成状态
    document.getElementById('reviewBtn').addEventListener('click', showStatsState);
    document.getElementById('restartAgainBtn').addEventListener('click', confirmRestart);
    
    // 统计视图
    document.getElementById('backToQuestionBtn').addEventListener('click', () => {
        showMainState();
        loadQuestion(currentQuestionIndex);
    });
}

// ============ 辅助函数 ============
function sanitizeHtml(html) {
    if (!html) return '';
    
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>');
}

function showError(message) {
    alert(message);
}

function showProgressDialog() {
    const answers = progressData.answers;
    const messageText = `检测到之前的答题记录\n\n已答题数: ${Object.keys(answers).length}\n\n选择继续还是重新开始？`;
    
    const confirmed = confirm(messageText + '\n\n确定（继续）/ 取消（重新开始）');
    if (confirmed) {
        showMainState();
        loadQuestion(currentQuestionIndex);
    } else {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
        localStorage.removeItem(STORAGE_KEY);
        showMainState();
        loadQuestion(0);
    }
}

function confirmRestart() {
    const confirmed = confirm('确定要重新开始吗？所有答案将被清除。');
    if (confirmed) {
        progressData = {
            answers: {},
            startTime: Date.now(),
            lastViewedIndex: 0
        };
        localStorage.removeItem(STORAGE_KEY);
        currentQuestionIndex = 0;
        showMainState();
        loadQuestion(0);
    }
}

// ============ 页面卸载时保存进度 ============
window.addEventListener('beforeunload', saveProgress);
