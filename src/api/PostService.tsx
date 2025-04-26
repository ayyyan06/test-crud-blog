import { Post } from "../types/post";
import axios from "axios";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async (): Promise<Post[]> => {
    await delay(500);
    const response = await axios.get("http://localhost:3000/posts");
    if (response.status !== 200) {
        throw new Error("Failed to fetch posts");
    }
    return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
    await delay(500);
    const response = await axios.get(`http://localhost:3000/posts/${id}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch post by ID");
    }
    return response.data;
};

export const addPost = async (title: string, text: string): Promise<void> => {
    await delay(500);
    const response = await axios.post(`http://localhost:3000/posts/`, {
        title,
        text,
        deleted: false
    });
    if (response.status !== 200) {
        throw new Error("Failed to edit post");
    }
};

export const editPost = async (id: string, title: string, text: string): Promise<void> => {
    await delay(500);
    const response = await axios.put(`http://localhost:3000/posts/${id}`, {
        title,
        text,
        deleted: false
    });
    if (response.status !== 200) {
        throw new Error("Failed to edit post");
    }
};

export const deletePost = async (id: string): Promise<void> => {
    await delay(500);
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    if (response.status !== 200 && response.status !== 204) {
        throw new Error("Failed to delete post");
    }
};
