package miu.edu.alumni.service;

import miu.edu.alumni.model.Tag;
import miu.edu.alumni.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService{

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<Tag> findAll() {
        return  tagRepository.findAll();
    }
}
