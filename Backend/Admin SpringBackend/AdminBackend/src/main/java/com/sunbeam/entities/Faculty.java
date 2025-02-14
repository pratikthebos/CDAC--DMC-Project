package com.sunbeam.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name ="faculty")
public class Faculty {
    
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int facultyId;
	
	@Column(nullable = false)
	private String firstName;
	
	@Column(nullable = false)
	private String lastName;
	
	@Column(unique = true, nullable = false)
	private String email;
	
	@Column(nullable=false)
	private String password;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="courseId")
	private Courses courses;
	
	private String address;
	
	private String photoImageName;
	
	private Date birthDate;
	
	private String status;
	
	private char gender;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "roleId", nullable=false)
	private Role role;
	
	
	@PrePersist
    public void prePersist() {
        if (status == null || status.isEmpty()) {
            this.status = "active";
        }
    }
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public int getFacultyId() {
		return facultyId;
	}
	
	public void setFacultyId(int facultyId) {
		this.facultyId = facultyId;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Faculty [facultyId=" + facultyId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", password=" + password + ", courses=" + courses + ", address=" + address
				+ ", photoImageName=" + photoImageName + ", birthDate=" + birthDate + ", gender=" + gender + ", role="
				+ role + "]";
	}

	public Courses getCourses() {
		return courses;
	}

	public void setCourses(Courses courses) {
		this.courses = courses;
	}

	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getPhotoImageName() {
		return photoImageName;
	}
	
	public void setPhotoImageName(String photoImageName) {
		this.photoImageName = photoImageName;
	}
	
	public Date getBirthDate() {
		return birthDate;
	}
	
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	
	public char getGender() {
		return gender;
	}
	
	public void setGender(char gender) {
		this.gender = gender;
	}

	
	
	
}
