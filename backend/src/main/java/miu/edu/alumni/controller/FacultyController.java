package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.FacultyServiceImpl;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Faculty> findAll() {
        return service.findAll();
    }
    
    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Optional<Faculty> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Faculty save(@RequestBody Faculty faculty) {
        return service.save(faculty);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public Faculty update(@PathVariable Long id, @RequestBody Faculty faculty) {
        faculty.setId(id);
        return service.save(faculty);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("filter")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Faculty> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin')")
    public List<Faculty> query(@RequestParam String search) {
        return service.query(search);
    }
}
