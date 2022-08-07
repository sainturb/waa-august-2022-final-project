package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.dto.JobAdvertisementDto;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.repository.JobAdvertisementRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class JobAdServiceImpl implements JobAdService{

    @Autowired
    private JobAdvertisementRepository jobAdRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public JobAdvertisementDto save(JobAdvertisementDto jobAdDto) {
        var jobAd = modelMapper.map(jobAdDto, JobAdvertisement.class);
        var newJobAd = jobAdRepo.save(jobAd);
        return newJobAd != null ? modelMapper.map(newJobAd, JobAdvertisementDto.class) : null;
    }

    @Override
    public List<JobAdvertisementDto> findAll() {
        var jobAds = new ArrayList<JobAdvertisementDto>();
        jobAdRepo.findAll().forEach(j -> jobAds.add(modelMapper.map(j, JobAdvertisementDto.class)));
        return jobAds;
    }

    @Override
    public JobAdvertisementDto update(JobAdvertisementDto jobAdDto) {
        if(jobAdRepo.existsById(jobAdDto.getId()))
            return save(jobAdDto);
        return null;
    }

    @Override
    public JobAdvertisementDto deleteById(long jobAdId) {
        var jobAd = jobAdRepo.findById(jobAdId).orElse(null);
        if(jobAd != null) {
            jobAdRepo.deleteById(jobAdId);
            return modelMapper.map(jobAd, JobAdvertisementDto.class);
        }
        return null;
    }

    @Override
    public List<JobAdvertisementDto> filter(Map<String, Object> params) {
        var jobAdsDto = new ArrayList<JobAdvertisementDto>();
        List<JobAdvertisement> jobAds;
        if (!params.isEmpty()) {
            Specification<JobAdvertisement> specification = Specification.where(null);
            for (String key : params.keySet()) {
                specification = specification.and(valueEquals(key, params.get(key)));
            }
            jobAds = jobAdRepo.findAll(specification);
        } else {
            jobAds = jobAdRepo.findAll();
        }
        jobAds.forEach(j -> jobAdsDto.add(modelMapper.map(j, JobAdvertisementDto.class)));
        return jobAdsDto;
    }

    @Override
    public List<JobAdvertisementDto> search(String query) {
        var jobAdsDto = new ArrayList<JobAdvertisementDto>();
        List<JobAdvertisement> jobAds;
        if (!query.isEmpty()) {
            Specification<JobAdvertisement> specification = Specification
                    .where(valueContains("title", query))
                    .or(valueContains("description", query))
                    .or(valueContains("benefit", query));

            jobAds = jobAdRepo.findAll(specification);
        } else {
            jobAds = jobAdRepo.findAll();
        }
        jobAds.forEach(j -> jobAdsDto.add(modelMapper.map(j, JobAdvertisementDto.class)));
        return jobAdsDto;
    }

    static Specification<JobAdvertisement> valueContains(String property, Object value) {
        return (ad, cq, cb) -> cb.like(ad.get(property), "%" + value.toString() + "%");
    }

    static Specification<JobAdvertisement> valueEquals(String property, Object value) {
        return (ad, cq, cb) -> cb.equal(ad.get(property), value);
    }
}
