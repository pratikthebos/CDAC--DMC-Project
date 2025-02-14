package com.sunbeam.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stdId;

    private String firstName;
    private String lastName;

    @Email
    private String email;

    private String password;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "courseId") 
    private Courses course;  

    private String address;
    
    private String photoImageName;

    private LocalDate birthDate;

    private char gender;
    
    private String status;

    public String getStatus() {
		return status;
	}
    
    @PrePersist
    public void prePersist() {
        if (status == null || status.isEmpty()|| status.equalsIgnoreCase("string")) {
            this.status = "Active";
        }
    }

	public void setStatus(String status) {
		this.status = status;
	}

	@ManyToOne
    @JoinColumn(name = "roleId") 
    private Role role;  

    
    public int getStdId() {
        return stdId;
    }

    public void setStdId(int stdId) {
        this.stdId = stdId;
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

    public Courses getCourse() {
        return course;
    }

    public void setCourse(Courses course) {
        this.course = course;
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

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
