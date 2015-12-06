<?php

namespace ApiBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Article
 *
 * @ORM\Table(name="article")
 * @ORM\Entity(repositoryClass="ApiBundle\Entity\ArticleRepository")
 * @ExclusionPolicy("all")
 */
class Article {
   
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * @Expose
     */
    private $id;

    /**
     * @var string $titre
     *
     * @ORM\Column(name="titre", type="string", length=255, nullable=true)
     * @Expose
     */
    private $titre;
    
    /**
     * @var text $description
     *
     * @ORM\Column(name="description", type="text")
     * @Expose
     */
    private $description;
    
    /**
     * @var string $image
     *
     * @ORM\Column(name="image", type="string", length=255, nullable=true)
     * @Expose
     */
    private $image;
    
    
    function getId() {
        return $this->id;
    }

    function getTitre() {
        return $this->titre;
    }

    function getDescription() {
        return $this->description;
    }

    function getImage() {
        return $this->image;
    }

        
    function setTitre($titre) {
        $this->titre = $titre;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setImage($image) {
        $this->image = $image;
    }


}




