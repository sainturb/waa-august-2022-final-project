package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.FacultyServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/faculties")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyServiceImpl service;

    @GetMapping()
    public List<Faculty> findAll() {
        return service.findAll();
    }
    
    @GetMapping("{id}")
    public Optional<Faculty> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Faculty save(@RequestBody Faculty faculty) {
        return service.save(faculty);
    }

    @PutMapping("{id}")
    public Faculty update(@PathVariable Long id, @RequestBody Faculty faculty) {
        faculty.setId(id);
        return service.save(faculty);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("filter")
    public List<Faculty> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    public List<Faculty> query(@RequestParam String search) {
        return service.query(search);
    }
}
