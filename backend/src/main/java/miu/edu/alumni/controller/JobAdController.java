package miu.edu.alumni.controller;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.dto.JobAdvertisementDto;
import miu.edu.alumni.service.JobAdService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/advertisements")
@RequiredArgsConstructor
public class JobAdController {

    private final JobAdService jobAdService;

    @PostMapping
    public JobAdvertisementDto save(@RequestBody JobAdvertisementDto jobAdDto) {
        return jobAdService.save(jobAdDto);
    }

    @GetMapping
    public List<JobAdvertisementDto> findAll() {
        return jobAdService.findAll();
    }

    @PutMapping("/{id}")
    public JobAdvertisementDto update(@PathVariable long id, @RequestBody JobAdvertisementDto jobAdDto) {
        jobAdDto.setId(id);
        return jobAdService.update(jobAdDto);
    }

    @DeleteMapping("/{id}")
    public JobAdvertisementDto delete(@PathVariable long id){
        return jobAdService.deleteById(id);
    }

    @GetMapping("/filter")
    public List<JobAdvertisementDto> filter(@RequestParam Map<String, String> params) {
        return jobAdService.filter(params);
    }

    @GetMapping("/search")
    public List<JobAdvertisementDto> search(@RequestParam String query) {
        return jobAdService.search(query);
    }

}
