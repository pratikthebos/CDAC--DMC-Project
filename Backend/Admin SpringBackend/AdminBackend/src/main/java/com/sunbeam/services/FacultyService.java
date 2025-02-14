package com.sunbeam.services;

import java.util.List;

import com.sunbeam.entities.Faculty;
import com.sunbeam.model.Credential;

public interface FacultyService {
      
	List<Faculty> AllFaculty();

	Faculty addFaculty(Faculty fact);

	Faculty loginFaculty(Credential cr);

	String deleteFaculty(int id);

	Faculty getFacultyById(int id);
}
