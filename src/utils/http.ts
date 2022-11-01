import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

class VAxios {
  private axiosInstance: AxiosInstance;
  private static VAxiosInstance: VAxios;

  private constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  /** 创建实例 */
  public static getInstance() {
    if (!this.VAxiosInstance) {
      this.VAxiosInstance = new this({
        //TODO baseURL
        baseURL: "",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "*/*",
        },
        timeout: 10000,
      });
    }

    return this.VAxiosInstance;
  }

  /** 设置请求拦截器 */
  private setRequestInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // const userStore = useUserStore();
        //TODO token
        const token = "";
        if (config.headers) {
          // 已登录才带上 Authorization
          if (token) {
            config.headers["Authorization"] = "Bearer " + token;
          }
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  /** 设置响应拦截器 */
  private setResponseInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (typeof response.data === "object" && !response.data.code) {
          return response.data; // 文件导出
        }
        if (response.data.code !== 200) {
          console.log(response);
          // throw 终止后续逻辑
          throw ElMessage.error(response.data.message || "访问出错");
        }
        return response.data;
      },
      (error: AxiosError | Error) => {
        if (!axios.isAxiosError(error) || !error.response) return Promise.reject(error.message);

        switch (error.response.status) {
          case 0:
            throw ElMessage.error("网络错误");
          case 401:
            throw ElMessage.error("请登录后操作");
          case 403:
            // router.replace("/403")
            throw ElMessage.error("403 权限不足");
          case 404:
            throw ElMessage.error("404 API 地址错误");
          case 405:
            throw ElMessage.error("405 方法不支持");
          case 500:
            throw ElMessage.error("500 服务器内部错误");
          case 502:
            throw ElMessage.error("502 网络服务器错误");
          default:
            throw ElMessage.error(
              typeof error.response.data === "string" || error.response.data instanceof String
                ? String(error.response.data)
                : ""
            );
        }
      }
    );
  }

  /** 请求 */
  async request<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.request(config);
  }

  /** get 请求 */
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.get(url, config);
  }

  /**
   * post 请求
   * @param url 请求地址
   * @param data body参数
   * @param config axios 配置
   */
  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * put 请求
   * @param url 请求地址
   * @param data body参数
   * @param config axios 配置
   */
  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * patch 请求
   * @param url 请求地址
   * @param data body参数
   * @param config axios 配置
   */
  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  /**
   * delete 请求
   * @param url 请求地址
   * @param config axios 配置
   */
  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance.delete(url, config);
  }
}

export default VAxios.getInstance();
