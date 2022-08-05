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
            case "faculty" ->  {
                return facultyService.findByUserId(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
            }
            case "student" -> {
                return studentService.findByUserId(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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
