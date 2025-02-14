package com.sunbeam.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sunbeam.entities.Faculty;
import com.sunbeam.entities.ShowResult;
import com.sunbeam.entities.Student;
import com.sunbeam.model.Credential;
import com.sunbeam.services.FacultyService;

@CrossOrigin
@RestController
public class FacultyController {

	@Autowired
	private FacultyService facultyService;

	@GetMapping("/facultys")
	public ResponseEntity<List<Faculty>> getAll() {
		List<Faculty> allFaculty = facultyService.AllFaculty();
		return ResponseEntity.ok(allFaculty);

	}
	
	@GetMapping("/faculty/{id}")
	public ResponseEntity<Faculty> getFaculty(@PathVariable("id") int id){
		Faculty fact = facultyService.getFacultyById(id);
		return ResponseEntity.ok(fact);
		
		//if null To-Do
	}

	@PostMapping("/faculty")
	public ResponseEntity<Faculty> addFaculty(@RequestBody Faculty fact) {
		Faculty faculty = facultyService.addFaculty(fact);
		return ResponseEntity.ok(faculty);
	}
	
	@DeleteMapping("/faculty/{id}")
	public ResponseEntity<String> deleteFaculty(@PathVariable("id") int id) {
	 String message = facultyService.deleteFaculty(id);
	  return ResponseEntity.ok(message);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginFaculty(@RequestBody Credential cr) {

	    Faculty faculty = facultyService.loginFaculty(cr);
	    if (faculty != null) {
	        return ResponseEntity.ok(faculty);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Faculty not found");
	    }
	}
	
	
	@Value("${images.path}")
	private String imageFolderPath;
	
	
	@GetMapping(value = "/images/{imagename}", produces = "image/jpeg")
	public void downloadImage(@PathVariable("imagename") String imageName, HttpServletResponse resp) throws IOException {
		
		try(FileInputStream in = new FileInputStream(imageFolderPath + imageName)){
			FileCopyUtils.copy(in, resp.getOutputStream());
		}
		
	}
	
	
	@PostMapping("upload/image")
	public String uploadImage(@RequestParam("file") MultipartFile file) {
	    String name = file.getOriginalFilename();
	    String fullPath = imageFolderPath + name;
	    File f = new File(imageFolderPath);
	    
	    if (!f.exists()) {
	        f.mkdirs(); // Create directories if they don't exist
	    }
	    
	    try (InputStream inputStream = file.getInputStream()) { // Ensures stream is closed
	        Files.copy(inputStream, Paths.get(fullPath), StandardCopyOption.REPLACE_EXISTING);
	        return name;
	    } catch (IOException e) {
	        e.printStackTrace();
	        return "img.jpg"; // Default fallback image
	    }
	}


}
