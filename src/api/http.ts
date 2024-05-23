interface RequestData {
    [key: string]: any
}

interface RequestOptions {
    method: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;
    responseType?: "text" | "arraybuffer"
}

function http(url: string, data: RequestData, option: RequestOptions = {method: 'GET', responseType: 'text'}): Promise<any> {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            method: option.method,
            responseType: option.responseType,
            header: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            success(res: any) {
                resolve(res.data)
            },
            fail(err: any) {
                reject(err.errMsg)
            }
        }).onChunkReceived((res: any)=>{
            console.log(res,' 000');
        })
    })
}

export default http;