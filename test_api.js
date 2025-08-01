const axios = require('axios');

// 测试API Key是否有效
const testApiKey = async () => {
    const apiKey = 'sk-036386759d3d4ac68a504b1cf8009594';
    
    try {
        console.log('正在测试API Key...');
        
        const response = await axios({
            method: 'post',
            url: 'https://api.siliconflow.cn/v1/chat/completions',
            data: {
                model: 'deepseek-ai/DeepSeek-V3',
                messages: [
                    {
                        role: 'user',
                        content: 'Hello'
                    }
                ],
                max_tokens: 10
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        
        console.log('✅ API Key 有效');
        console.log('响应状态:', response.status);
        console.log('响应数据:', response.data);
        return true;
        
    } catch (error) {
        console.log('❌ API Key 测试失败');
        console.log('错误状态码:', error.response?.status);
        console.log('错误信息:', error.response?.data);
        
        if (error.response?.status === 401) {
            console.log('🔑 401错误 - API Key可能已失效或无效');
            console.log('请检查：');
            console.log('1. API Key是否正确');
            console.log('2. API Key是否已过期');
            console.log('3. 账户余额是否充足');
            console.log('4. 是否超过了调用限制');
        }
        
        return false;
    }
};

// 运行测试
testApiKey(); 