package miu.edu.alumni.service;

import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.model.Student;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface JobAdService {
   JobAdvertisement save(JobAdvertisement jobAd);
   List<JobAdvertisement> findAll();

   Optional<JobAdvertisement> findOne(Long id);

   JobAdvertisement update(JobAdvertisement jobAd);
   void deleteById(long jobAdId);
   List<JobAdvertisement> filter(Map<String, Object> params);
   List<JobAdvertisement> search(String query);
   List<JobAdvertisement> myAll(String username);
   void apply(Long id, Student student);
}
