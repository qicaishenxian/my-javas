// UTM生成器
const utmTemplates = {
    wechat: {
        source: 'wechat',
        medium: 'social',
        campaign: 'post'
    },
    douyin: {
        source: 'douyin',
        medium: 'video',
        campaign: 'campaign'
    }
};

function generateUTM() {
    const baseUrl = document.getElementById('baseUrl').value;
    const template = document.getElementById('template').value;
    
    if (!baseUrl) {
        alert('请输入基础URL');
        return;
    }

    const params = new URLSearchParams({
        ...utmTemplates[template] || {},
        utm_content: new Date().toISOString().split('T')[0]
    });

    const finalUrl = `${baseUrl}?${params}`;
    const output = document.getElementById('utmOutput');
    
    output.innerHTML = `
        <p>推广链接：</p>
        <input type="text" value="${finalUrl}" readonly>
        <button onclick="copyToClipboard('${finalUrl}')">复制</button>
        <button onclick="generateQRCode('${finalUrl}')">生成二维码</button>
    `;
}

// SEO分析
function analyzeSEO() {
    const seoData = {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || '未设置',
        h1Count: document.querySelectorAll('h1').length,
        images: document.querySelectorAll('img').length
    };

    let score = 100;
    const issues = [];
    
    if (seoData.title.length > 60) {
        score -= 20;
        issues.push('标题过长');
    }
    
    if (seoData.description.length < 120) {
        score -= 15;
        issues.push('描述过短');
    }

    document.getElementById('seoResult').innerHTML = `
        <h3>SEO得分：${score}/100</h3>
        <p>标题：${seoData.title}</p>
        <p>描述：${seoData.description}</p>
        <p class="${score < 80 ? 'warning' : ''}">存在问题：${issues.join(' | ') || '无'}</p>
    `;
}

// 二维码生成
function generateQR() {
    const content = document.getElementById('qrContent').value;
    if (!content) {
        alert('请输入内容');
        return;
    }
    
    QRCode.toCanvas(document.getElementById('qrcode'), content, {
        width: 200,
        margin: 2
    }, error => {
        if (error) console.error(error);
    });
}

// 工具函数
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('复制成功！'))
        .catch(err => console.error('复制失败:', err));
}
