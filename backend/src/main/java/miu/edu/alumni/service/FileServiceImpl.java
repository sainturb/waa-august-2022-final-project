package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.repository.FileRepository;
import miu.edu.alumni.repository.JobAdvertisementRepository;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

    private final FileRepository repository;
    @Override
    public FileEntity upload(MultipartFile multipartFile) {
        String extension =  FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), extension);
        FileEntity file = new FileEntity();
        file.setOriginalName(multipartFile.getOriginalFilename());
        file.setSize(multipartFile.getSize());
        file.setType(multipartFile.getContentType());
        file.setLocation(System.getProperty("java.io.tmpdir"));
        file.setName(String.format("%s.%s", name, extension));
        return repository.save(file);
    }

    @Override
    public Optional<FileEntity> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public FileEntity downloadById(Long id) {
        Optional<FileEntity> file = findById(id);
        if (file.isPresent()) {
            return file.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public FileEntity downloadByName(String name) {
        Optional<FileEntity> file = repository.findByName(name);
        if (file.isPresent()) {
            return file.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
    }
}
