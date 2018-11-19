let baseUrl = "http://106.14.115.8:8008/api/";
if (process.env.NODE_ENV === "development") {
    baseUrl = "http://106.14.115.8:8008/api/";
     // baseUrl = "http://api.jzker.cn/api/";
}
if (process.env.NODE_ENV === "production") {
    baseUrl = "http://api.jzker.cn/api/";
    //baseUrl = "http://106.14.115.8:8008/api/";
}
export default baseUrl;