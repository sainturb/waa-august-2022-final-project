package miu.edu.alumni.service;

import miu.edu.alumni.model.FileEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface FileService {
    FileEntity upload(Long ad, MultipartFile multipartFile);

    Optional<FileEntity> findById(Long id);

    FileEntity downloadById(Long ad, Long id);
    FileEntity downloadByName(Long ad, String name);
}
