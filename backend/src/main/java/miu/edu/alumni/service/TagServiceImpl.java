package miu.edu.alumni.service;

import miu.edu.alumni.dto.TagDto;
import miu.edu.alumni.repository.TagRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TagServiceImpl implements TagService{

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TagRepository tagRepository;

    @Override
    public List<TagDto> findAll() {
        List<TagDto> tagDtos = new ArrayList<TagDto>();
        tagRepository.findAll().forEach(t -> tagDtos.add(modelMapper.map(t, TagDto.class)));
        return tagDtos;
    }
}
