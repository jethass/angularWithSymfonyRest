<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="home"))
     * @Template()
     */
    public function indexAction(Request $request)
    {
        
         return $this->container->get('templating')->renderResponse('AppBundle:Default:index.html.twig', array( 'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..') ));
        
        // replace this example code with whatever you need
        /*return $this->render('Default/index.html.twig', 
                array(
                      'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..'),
                     )
        );*/
    }
}
