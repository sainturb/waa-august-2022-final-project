package miu.edu.alumni.service;

import miu.edu.alumni.dto.JobAdvertisementDto;
import miu.edu.alumni.model.JobAdvertisement;

import java.util.List;
import java.util.Map;

public interface JobAdService {
    public JobAdvertisementDto save(JobAdvertisementDto jobAdDto);
    public List<JobAdvertisementDto> findAll();
    public JobAdvertisementDto update(JobAdvertisementDto jobAdDto);
    public JobAdvertisementDto deleteById(long jobAdId);
    public List<JobAdvertisementDto> filter(Map<String, String> params);
    public List<JobAdvertisementDto> search(String query);
}
