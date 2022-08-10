package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.JobHistory;
import miu.edu.alumni.service.HistoryServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public List<JobHistory> findAll() {
        return service.findAll();
    }


    @PostMapping
    public JobHistory save(@RequestBody JobHistory history) {
        return service.save(history);
    }

    @PutMapping("{id}")
    public JobHistory update(@PathVariable Long id, @RequestBody JobHistory history) {
        return service.save(history);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<JobHistory> findOne(@PathVariable Long id) {
        return service.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("list/my")
    public List<JobHistory> myAll(Principal principal) {
        return service.myAll(principal.getName());
    }

    @GetMapping("list/by-user-id/{userId}")
    public List<JobHistory> byUserId(@PathVariable String userId) {
        return service.findUserId(userId);
    }

    @GetMapping("filter")
    public List<JobHistory> filter(@RequestParam Map<String, Object> params) {
        return service.filter(params);
    }

    @GetMapping("query")
    public List<JobHistory> filter(@RequestParam String search) {
        return service.query(search);
    }
}
