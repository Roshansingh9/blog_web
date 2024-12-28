import conf from "../config/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call login function
        return this.login({ email, password });
        return userAccount;
      } else {
        return;
      }
    } catch (e) {
      throw e;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (e) {
      throw e;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      throw e;
    }

    return null;
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (e) {
      throw e;
    }
  }
}

const authService = new AuthService();
export default authService;
