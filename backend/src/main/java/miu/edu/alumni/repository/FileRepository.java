package miu.edu.alumni.repository;

import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.model.JobAdvertisement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
    Optional<FileEntity> findByName(String name);
    Optional<FileEntity> findByAdvertisementAndName(JobAdvertisement ad, String name);
    Optional<FileEntity> findByAdvertisementAndId(JobAdvertisement ad, Long id);
}
