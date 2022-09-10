<?php

namespace App\Service;

use Symfony\Component\Yaml\Yaml;

/**
 * Class OrganizationService
 * @package App\Service
 */
class OrganizationService
{
    /**
     * @var string Yaml File path
     */
    private $filePath;

    /**
     * OrganizationService constructor.
     * @param $yamlFile
     */
    public function __construct($yamlFile)
    {
        $this->filePath = $yamlFile;
    }

    /**
     * @return array|mixed
     */
    public function getAll()
    {
        // parse the yaml file and get an array of values
       $list = Yaml::parseFile($this->filePath);

        // empty file
        if (null === $list) {
            $list = array();
        }

        // not an array
        if (!is_array($list)) {
            throw new \InvalidArgumentException(sprintf('The file "%s" must contain a YAML array.', $this->filePath));
        }

        return $list;
    }

    /**
     * @param $index
     * @param $data
     * @return array|mixed
     */
    public function update($index, $data)
    {
        // parse the yaml file and get an array of values
        $list = Yaml::parseFile($this->filePath);

        // replace the old item number $index with the new item $data
        $list['organizations'][$index] = $data;

        // convert the array $list into yaml configs
        $yaml = Yaml::dump($list);

        // save the result into the file
        file_put_contents($this->filePath, $yaml);

        return $this->getAll();
    }

    /**
     * @param $index
     * @param $data
     * @return array|mixed
     */
    public function create($data)
    {
        // parse the yaml file and get an array of values
        $list = Yaml::parseFile($this->filePath);

        //add the new item $data
        $organizations = $list['organizations'];
        $organizations[] = $data;

        $list['organizations'] = $organizations;

        // convert the array $list into yaml configs
        $yaml = Yaml::dump($list);

        // save the result into the file
        file_put_contents($this->filePath, $yaml);

        return $this->getAll();
    }

    /**
     * @param $index
     * @return array|mixed
     */
    public function delete($index)
    {
        // parse the yaml file and get an array of values
        $list = Yaml::parseFile($this->filePath);

        // remove the organization item number $index
        unset($list['organizations'][$index]);

        // convert the array $list into yaml configs
        $yaml = Yaml::dump($list);

        // save the result into the file
        file_put_contents($this->filePath, $yaml);

        return $this->getAll();
    }


}