package miu.edu.alumni.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface FilesStorageService {
    void init();
    void save(String name, MultipartFile file);

    Resource load(String filename);

    void deleteAll();

    void delete(String filename);

    Stream<Path> loadAll();
}
