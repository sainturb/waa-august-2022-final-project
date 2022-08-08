package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.service.JobAdServiceImpl;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("filter")
    public List<JobAdvertisement> filter(@RequestParam Map<String, Object> params) {
        return jobAdService.filter(params);
    }

    @GetMapping("search")
    public List<JobAdvertisement> search(@RequestParam String query) {
        return jobAdService.search(query);
    }
}
