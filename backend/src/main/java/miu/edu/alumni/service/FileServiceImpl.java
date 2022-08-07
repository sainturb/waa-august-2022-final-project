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
    private final JobAdvertisementRepository adRepository;

    @Override
    public FileEntity upload(Long ad, MultipartFile multipartFile) {
        String extension =  FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        String name = String.format("%s.%s", RandomStringUtils.randomAlphanumeric(8), extension);
        FileEntity file = new FileEntity();
        Optional<JobAdvertisement> advertisement = adRepository.findById(ad);
        advertisement.ifPresent(file::setAdvertisement);
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

    public Optional<FileEntity> findByAdAndId(Long ad, Long id) {
        Optional<JobAdvertisement> optional = adRepository.findById(ad);
        return optional.flatMap(advertisement -> repository.findByAdvertisementAndId(advertisement, id));
    }

    public Optional<FileEntity> findByAdAndName(Long ad, String name) {
        Optional<JobAdvertisement> optional = adRepository.findById(ad);
        return optional.flatMap(advertisement -> repository.findByAdvertisementAndName(advertisement, name));
    }

    @Override
    public FileEntity downloadById(Long ad, Long id) {
        Optional<FileEntity> file = findByAdAndId(ad, id);
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
