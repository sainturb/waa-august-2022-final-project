package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.model.JobHistory;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.service.FileServiceImpl;
import miu.edu.alumni.service.JobAdServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/advertisements")
@RequiredArgsConstructor
public class JobAdController {

    private final JobAdServiceImpl jobAdService;

    @PostMapping
    public JobAdvertisement save(@RequestBody JobAdvertisement jobAd) {

        return jobAdService.save(jobAd);
    }

    @GetMapping
    public List<JobAdvertisement> findAll() {
        return jobAdService.findAll();
    }

    @PutMapping("/{id}")
    public JobAdvertisement update(@PathVariable long id, @RequestBody JobAdvertisement jobAd) {
        jobAd.setId(id);
        return jobAdService.update(jobAd);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        jobAdService.deleteById(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<JobAdvertisement> findOne(@PathVariable Long id) {
        return jobAdService.findOne(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/list/my")
    public List<JobAdvertisement> myAll(Principal principal) {
        return jobAdService.myAll(principal.getName());
    }

    @GetMapping("filter")
    public List<JobAdvertisement> filter(@RequestParam Map<String, Object> params, Principal principal) {
        return jobAdService.filter(params);
    }

    @GetMapping("search")
    public List<JobAdvertisement> search(@RequestParam String query) {
        return jobAdService.search(query);
    }

    @PostMapping("apply/{id}")
    public void apply(@PathVariable Long id, @RequestBody Student student) {
        jobAdService.apply(id, student);
    }
}
