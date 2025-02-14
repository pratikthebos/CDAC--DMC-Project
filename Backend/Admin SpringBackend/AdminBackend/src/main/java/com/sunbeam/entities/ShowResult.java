package com.sunbeam.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

enum StatusBlog {
	success,error
}


@JsonInclude(value = Include.NON_NULL)
public class ShowResult<T> {
	
	private StatusBlog status;
	private T data;
	private String message;
	
	public ShowResult() {
		
	}

	public ShowResult(StatusBlog status, T data, String message) {
		super();
		this.status = status;
		this.data = data;
		this.message = message;
	}
	
	
	public StatusBlog getStatus() {
		return status;
	}
	public void setStatus(StatusBlog status) {
		this.status = status;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public static <T> ShowResult<T> success(T data) {
        ShowResult<T> res = new ShowResult<T>(StatusBlog.success, data, null);
        return res;
    }
	
	
    public static <T> ShowResult<T> error(String message) {
        ShowResult<T> res = new ShowResult<T>(StatusBlog.error, null, message);
        return res;
    }
	

}
