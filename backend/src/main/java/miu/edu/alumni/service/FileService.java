package miu.edu.alumni.service;

import miu.edu.alumni.model.FileEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileService {
    FileEntity upload(MultipartFile multipartFile);

    Optional<FileEntity> findById(Long id);

    FileEntity downloadById(Long id);

    void deleteById(Long id);
    FileEntity downloadByName(String name);
}
