package com.sunbeam.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.daos.FacultyDao;
import com.sunbeam.entities.Courses;
import com.sunbeam.entities.Faculty;
import com.sunbeam.entities.Student;
import com.sunbeam.model.Credential;

@Transactional
@Service
public class FacultyServiceImpl implements FacultyService {
	
	@Autowired
	private FacultyDao facultyDao;
	
	public List<Faculty> AllFaculty(){
		List<Faculty> list = facultyDao.findByStatus("active");
	    return list;
	}

	@Override
	public Faculty addFaculty(Faculty fact) {
		Faculty faculty = facultyDao.save(fact);
		return faculty;
	}

	@Override
	public Faculty loginFaculty(Credential cr) {
		
	Faculty faculty = facultyDao.findByEmail(cr.getEmail());
	
	System.out.println(faculty);
	
	if(faculty.getPassword().equals(cr.getPassword()) && faculty.getRole().getRoleName().equals("Admin"))
		return faculty;
	return null;
	}

	@Override
	public String deleteFaculty(int id) {
		 
	    int count = facultyDao.changeStatus(id);
	    
	    if(count > 0) {
	        return "Course status updated to inactive successfully.";
	    } else {
	        return "Course not found or status update failed.";
	    }
	}

	@Override
	public Faculty getFacultyById(int id) {
		Optional<Faculty> fact = facultyDao.findById(id);
		 if(fact.isPresent()) {
			 Faculty faculty = fact.get();
			 return faculty ;
		 }
		//if null To-Do
		 
		
		return null;
	}
	

}
