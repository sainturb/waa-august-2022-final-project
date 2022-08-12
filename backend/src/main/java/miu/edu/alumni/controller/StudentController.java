package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.StudentServiceImpl;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl service;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Student> findAll() {
        return service.findAll();
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Optional<Student> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Student save(@RequestBody Student student) {
        return service.save(student);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Student update(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return service.save(student);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("filter")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Student> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Student> filter(@RequestParam String search) {
        return service.query(search);
    }
}
