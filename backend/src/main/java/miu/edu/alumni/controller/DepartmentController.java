package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Department;
import miu.edu.alumni.service.DepartmentServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentServiceImpl service;

    @GetMapping()
    public List<Department> findAll() {
        return service.findAll();
    }
    
    @GetMapping("{id}")
    public Optional<Department> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Department save(@RequestBody Department faculty) {
        return service.save(faculty);
    }

    @PutMapping("{id}")
    public Department update(@PathVariable Long id, @RequestBody Department faculty) {
        faculty.setId(id);
        return service.save(faculty);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("filter")
    public List<Department> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    public List<Department> query(@RequestParam String search) {
        return service.query(search);
    }
}
