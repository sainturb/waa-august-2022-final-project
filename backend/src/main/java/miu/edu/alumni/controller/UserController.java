package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.FacultyServiceImpl;
import miu.edu.alumni.service.StudentServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final StudentServiceImpl studentService;
    private final FacultyServiceImpl facultyService;

    @GetMapping("{type}/{id}")
    public ResponseEntity<?> getByUserId(@PathVariable String type, @PathVariable String id) {
        switch (type) {
            case "faculty": return facultyService.findByEmail(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
            case "student": return studentService.findByEmail(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    @PostMapping("create-current-user/{type}")
    public void getByUserId(@PathVariable String type, @RequestBody Map<String, String> body) {
        switch (type) {
            case "faculty" :
                Faculty faculty = new Faculty();
                faculty.setUserId(body.get("userId"));
                faculty.setFirstName(body.get("firstName"));
                faculty.setLastname(body.get("lastname"));
                faculty.setEmail(body.get("email"));
                facultyService.findByEmail(faculty.getEmail())
                        .map(found -> {
                            found.setUserId(body.get("userId"));
                            return facultyService.save(found);
                        })
                        .orElseGet(() -> facultyService.save(faculty));
                break;
            case "student":
                Student student = new Student();
                student.setUserId(body.get("userId"));
                student.setFirstName(body.get("firstName"));
                student.setLastname(body.get("lastname"));
                student.setEmail(body.get("email"));
                studentService.findByEmail(student.getEmail())
                        .map(found -> {
                            found.setUserId(body.get("userId"));
                            return studentService.save(found);
                        })
                        .orElseGet(() -> studentService.save(student));
                break;

        }
    }

    @PostMapping("student")
    public Student save( @RequestBody Student student) {
        return studentService.save(student);
    }

    @PostMapping("faculty")
    public Faculty save( @RequestBody Faculty faculty) {
        return facultyService.save(faculty);
    }
}
