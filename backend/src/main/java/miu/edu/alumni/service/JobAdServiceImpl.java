package miu.edu.alumni.service;

import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.model.JobHistory;
import miu.edu.alumni.model.Student;
import miu.edu.alumni.model.Tag;
import miu.edu.alumni.repository.JobAdvertisementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.*;

@Service
public class JobAdServiceImpl implements JobAdService {

    @Autowired
    private JobAdvertisementRepository jobAdRepo;

    @Autowired
    private StudentServiceImpl studentService;

    @Override
    public JobAdvertisement save(JobAdvertisement jobAd) {
        return jobAdRepo.save(jobAd);
    }

    @Override
    public List<JobAdvertisement> findAll() {
        return jobAdRepo.findAll();
    }

    @Override
    public JobAdvertisement update(JobAdvertisement jobAd) {
        return save(jobAd);
    }

    @Override
    public void deleteById(long jobAdId) {
        jobAdRepo.deleteById(jobAdId);
    }

    @Override
    public List<JobAdvertisement> myAll(String username) {
        Specification<JobAdvertisement> query = Specification
                .where(valueEquals("createdBy", username));
        return jobAdRepo.findAll(query);
    }

    @Override
    public List<JobAdvertisement> filter(Map<String, Object> params) {
        if (!params.isEmpty()) {
            Specification<JobAdvertisement> specification = Specification.where(null);
            for (String key : params.keySet()) {
                if (key.equals("tags")) {
                    String valueText = (String) params.get(key);
                    specification = specification.and(valueIn(key, Arrays.stream(valueText.split(",")).toList()));
                } else {
                    specification = specification.and(valueEquals(key, params.get(key)));
                }
            }
            return jobAdRepo.findAll(specification);
        }
        return jobAdRepo.findAll();
    }

    @Override
    public List<JobAdvertisement> search(String query) {
        if (!query.isEmpty()) {
            Specification<JobAdvertisement> specification = Specification
                    .where(valueContains("title", query))
                    .or(valueContains("description", query))
                    .or(valueContains("benefit", query));

            return jobAdRepo.findAll(specification);
        }
        return jobAdRepo.findAll();
    }

    @Override
    public void apply(Long id, Student student) {
        Optional<JobAdvertisement> optional = jobAdRepo.findById(id);
        optional.ifPresent(jobAdvertisement -> {
            jobAdvertisement.getApplied().add(student);
            save(jobAdvertisement);
        });
    }

    static Specification<JobAdvertisement> valueIn(String property, List<String> tags) {
        return (ad, cq, cb) -> {
            cq.distinct(true);
            Root<Tag> owner = cq.from(Tag.class);
            Expression<Collection<JobAdvertisement>> ownerCats = owner.get("advertisements");
            return cb.and(cb.in(owner.get("name")).value(tags), cb.isMember(ad, ownerCats));
        };
    }

    static Specification<JobAdvertisement> valueContains(String property, Object value) {
        return (ad, cq, cb) -> cb.like(ad.get(property), "%" + value.toString() + "%");
    }

    static Specification<JobAdvertisement> valueEquals(String property, Object value) {
        return (ad, cq, cb) -> cb.equal(ad.get(property), value);
    }

    static Specification<JobAdvertisement> valueNotEquals(String property, Object value) {
        return (ad, cq, cb) -> cb.notEqual(ad.get(property), value);
    }

//    private JobAdvertisement convertToDto(JobAdvertisement jobAd) {
//        var jobAd = modelMapper.map(jobAd, JobAdvertisement.class);
//        jobAd.setTags(jobAd.getTags().stream().map(t -> modelMapper.map(t, TagDto.class)).collect(Collectors.toList()));
//        return jobAd;
//    }
}
