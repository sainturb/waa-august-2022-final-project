package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.StudentServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl service;

    @GetMapping()
    public List<Student> findAll() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public Optional<Student> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Student save(Student student) {
        return service.save(student);
    }

    @PutMapping("{id}")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        return service.save(student);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
