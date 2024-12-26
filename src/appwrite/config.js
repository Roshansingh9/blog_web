import conf from "../config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async updatepost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (e) {
      throw e;
      return false;
    }
  }

  async getpost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (e) {
      throw e;
    }
  }

  async getpost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (e) {
      throw e;
    }
  }

  async getposts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (e) {
      console.log("AppWrite Service::getPosts::error", e);
      return false;
    }
  }


  // Files Functions

  async uploadfile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketbaseId,
        ID.unique(),
        file
      );
    } catch (e) {
      console.log("AppWrite Service::getPosts::error", e);
      return false;
    }
  }

  async deletefile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketbaseId,
        ID.unique(),
        file
      );
      return true;
    } catch (e) {
      console.log("AppWrite Service::getPosts::error", e);
      return false;
    }
  }

   previewfile(fileID) {
    try {
      return  this.bucket.getFilePreview(
        conf.appwriteBucketbaseId,
        fileID
      );
    } catch (e) {
      console.log("AppWrite Service::getPosts::error", e);
      return false;
    }
  }
}

const service = new service();
export default Service;
