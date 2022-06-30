import axios from "axios";
const baseUrl = "https://magento-796150-2722660.cloudwaysapps.com";
const type = "rest";
const version = "V1";

const getUrl = (base: string, type: string, version: string) =>
  `${base}/${type}/${version}`;

export const getImage = (src: string, productImg: boolean = true) => {
  if (productImg) return `${baseUrl}/media/catalog/product${src}`;
  if (!productImg) return `${baseUrl}/${src}`;
};

class HttpService {
  token: any;
  constructor(private baseUrl: string, private api: any) {
    this.baseUrl = baseUrl;
    this.api = api;
    this.token = this.getToken();
  }
  async getToken() {
    return await this.api({
      method: "post",
      url: `${this.baseUrl}/integration/admin/token`,
      data: {
        username: "mrozhanskiy.stellarsoft@gmail.com",
        password: "GC28E3PnKcucDF",
      },
    })
      .then((res: any) => res.data)
      .catch((error: any) => console.log(error));
  }
  async get(url: string) {
    return await this.api
      .get(`${this.baseUrl}${url}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${await this.token}`,
        },
      })
      .catch((error: any) => console.log(error));
  }
}

const httpService = new HttpService(getUrl(baseUrl, type, version), axios);

class Api {
  constructor(private _httpService: HttpService) {
    this._httpService = httpService;
  }
  async getData(url: string) {
    const res = await this._httpService.get(url);
    return await res?.data;
  }
}

export default new Api(httpService);
