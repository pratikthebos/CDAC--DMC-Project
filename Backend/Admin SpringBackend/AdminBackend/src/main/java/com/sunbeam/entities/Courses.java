package com.sunbeam.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name="courses")
public class Courses {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int courseId;
	private String courseName;
	private String courseDesc;
	
	private String status; 
	
	


	public Courses(int courseId, String courseName, String courseDesc, String status) {
	
		this.courseId = courseId;
		this.courseName = courseName;
		this.courseDesc = courseDesc;
		this.status = status; 
	}
	
	

	public Courses() {
		
	}

	@PrePersist
    public void prePersist() {
        if (status == null || status.isEmpty()) {
            this.status = "Active";
        }
    }


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getCourseId() {
		return courseId;
	}
	
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	
	public String getCourseName() {
		return courseName;
	}
	
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	public String getCourseDesc() {
		return courseDesc;
	}
	
	public void setCourseDesc(String courseDesc) {
		this.courseDesc = courseDesc;
	}



	@Override
	public String toString() {
		return "Courses [courseId=" + courseId + ", courseName=" + courseName + ", courseDesc=" + courseDesc
				+ ", status=" + status + "]";
	}
	
	

}
