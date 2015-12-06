<?php

namespace ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use ApiBundle\Entity\Article;
use ApiBundle\Entity\ArticleRepository;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\Annotations\Delete;
use FOS\RestBundle\Controller\Annotations\Put;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcher;
use FOS\RestBundle\View\View AS FOSView;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class ArticlesController extends Controller
{
    
    /**
     * @Get("/articles", name="articles_get", options={ "method_prefix" = false })
     * @ApiDoc(
     *  description="Lister les articles",
     *  requirements={{"name"="_format","dataType"="","requirement"="json","description"=""}},
     *  parameters={},
     *  output="['success'] = true si toute est valide ou ['success'] = false avec un message descriptif sur le traitement."
     * )
     */
    public function getArticlesAction(Request $request)
	{
            $view = FOSView::create();
            
            $em = $this->getDoctrine()->getManager();
            
            $em = $this->getDoctrine()->getEntityManager();
            $data = $em->getRepository('ApiBundle:Article')->findAll();

            if(!empty($data)){
                $result['success'] = true;
                $result['data']= $data;
            }else{
                $result['success'] = false;
                $result['errors']['message'] = "erreur survenue.";
            }
            $view->setStatusCode(200)->setData($result);
            return $view;
    }
    
    /**
     * @Post("/articles/new", name="add_new_articlet", options={ "method_prefix" = false })
     * @ApiDoc(
     * description="add new article",
     * requirements={{"name"="_format","dataType"="","requirement"="json","description"=""}},
     * parameters={
     *             {"name"="titre",  "dataType"="string", "required"=true, "description"="janrain user id"},
     *             {"name"="description", "dataType"="string", "required"=true, "description"="janrain user token"},
     *             {"name"="image",  "dataType"="string", "required"=true, "description"="the sponsor name"}
     * },
     * output="['success'] = true si toute est valide ou ['success'] = false avec un message descriptif sur le traitement."
     * )
     */
    public function newArticleAction(Request $request)
    {
        
            $view = FOSView::create();
            $em = $this->getDoctrine()->getManager();
            if($request->get('titre') && $request->get('description') && $request->get('image')){
                        $article=new Article();
                        $article->setTitre($request->get('titre'));
                        $article->setDescription($request->get('description'));
                        $article->setImage($request->get('image'));
                       
                            $em->persist($article);
                            $em->flush();
                            $result['success'] = true;
                            $result['message'] = 'Article ajouté avec succès';
                       
            }else{
                        $result['success'] = false;
                        $result['message'] = 'Données invalides ou manquantes';
            }

            $view->setStatusCode(200)->setData($result);
            return $view;
    }
    
    /**
     * @Delete("/articles/delete/{id}", name="delete_article", options={ "method_prefix" = false })
     * @ApiDoc(
     *  description="Delete article",
     *  requirements={{"name"="_format","dataType"="","requirement"="json","description"=""}},
     *  parameters={
     *           {"name"="id", "dataType"="Integer", "required"=true, "description"="id article"}
     * }
     * )
     *
     */
    public function deleteArticleAction(Request $request)
    {
        $view = FOSView::create();
        $em = $this->getDoctrine()->getManager();
                if($request->get('id') && $article = $em->getRepository('ApiBundle:Article')->findOneById($request->get('id'))){
                    $em->remove($article);
                    $em->flush();
                    $result['success'] = true;
                    $result['message'] = 'Article supprimer avec succès';
                }else{
                    $result['success'] = false;
                    $result['message'] = 'Suppression article echoué';
                }

        $view->setStatusCode(200)->setData($result);
        return $view;
    }
    
    
    /**
     * @Put("/articles/update/{id}", name="update_article", options={ "method_prefix" = false })
     * @ApiDoc(
     *  description="Update article",
     *  requirements={{"name"="_format","dataType"="","requirement"="json","description"=""}},
     *  parameters={
     *      {"name"="id", "dataType"="integer", "required"=true, "description"="id article"},
     *      {"name"="titre", "dataType"="string", "required"=true, "description"="titre article"},
     *      {"name"="description", "dataType"="string", "required"=true, "description"="description article"},
     *      {"name"="image", "dataType"="string", "required"=true, "description"="image article"}
     *  }
     * )
     *
     */
    public function updateAction(Request $request)
    {
        $view = FOSView::create();
        $em = $this->getDoctrine()->getManager();
        if($request->get('id') && $article = $em->getRepository('ApiBundle:Article')->findOneById($request->get('id'))){
            
           $article->setTitre($request->get('titre'));
           $article->setDescription($request->get('description'));
           $article->setImage($request->get('image'));;
           $em->persist($article);
           $em->flush();
           $result['success'] = true;
           $result['message'] = "Article modifié avec succès";
           
        }else{
           $result['success'] = false;
           $result['message'] = "Article n'est pas modifié";
        }

        $view->setStatusCode(200)->setData($result);
        return $view;
    }
    
    
}
