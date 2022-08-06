package miu.edu.alumni.service;

import lombok.RequiredArgsConstructor;
import miu.edu.alumni.model.FileEntity;
import miu.edu.alumni.model.JobAdvertisement;
import miu.edu.alumni.repository.FileRepository;
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
//    private final JobAdvertisement adRepository;

    @Override
    public FileEntity upload(Long ad, MultipartFile multipartFile) {
        String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), "dat");
        String extension =  FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        FileEntity file = new FileEntity();
//        file.setAdvertisement(adRepository.findById(ad));
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
    public FileEntity downloadById(Long ad, Long id) {
        Optional<FileEntity> file = findById(id);
        if (file.isPresent()) {
            return file.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
    }

    @Override
    public FileEntity downloadByName(Long ad, String name) {
        Optional<FileEntity> file = repository.findByName(name);
        if (file.isPresent()) {
            return file.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found");
    }
}
