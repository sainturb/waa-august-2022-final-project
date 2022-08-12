package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.JobHistory;
import miu.edu.alumni.service.HistoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/histories")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryServiceImpl service;

    @GetMapping()
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public List<JobHistory> findAll() {
        return service.findAll();
    }


    @PostMapping
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public JobHistory save(@RequestBody JobHistory history) {
        return service.save(history);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public JobHistory update(@PathVariable Long id, @RequestBody JobHistory history) {
        history.setId(id);
        return service.save(history);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public ResponseEntity<JobHistory> findOne(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("list/my")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public List<JobHistory> myAll(Principal principal) {
        return service.myAll(principal.getName());
    }

    @GetMapping("list/by-user-id/{userId}")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public List<JobHistory> byUserId(@PathVariable String userId) {
        return service.findUserId(userId);
    }

    @GetMapping("filter")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public List<JobHistory> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    @PreAuthorize("hasAnyAuthority('faculty', 'admin', 'student')")
    public List<JobHistory> filter(@RequestParam String search) {
        return service.query(search);
    }
}
