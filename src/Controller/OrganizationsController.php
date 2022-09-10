<?php

namespace App\Controller;

use App\Service\OrganizationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class OrganizationsController extends AbstractController
{
    /**
     * @Route("/", name="index")
     *
     * @return Response
     */
    public function index(): Response
    {
        return $this->render(
            'organizations/index.html.twig'
        );
    }

    /**
     * @Route("/organizations", name="organizations")
     *
     * @param OrganizationService $service
     *
     * @return JsonResponse
     */
    public function list(OrganizationService $service): JsonResponse
    {
        return new JsonResponse($service->getAll());
    }

    /**
     * @Route("/organizations/delete", name="organization_delete")
     *
     * @param OrganizationService $service
     * @param Request $request
     * @return JsonResponse
     */
    public function remove(Request $request, OrganizationService $service): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $id = intval($parameters['id']) ?? -1;

        if ($id === -1) {
            return new JsonResponse($service->getAll());
        }

        return new JsonResponse($service->delete($id));
    }

    /**
     * @Route("/organizations/edit", name="organization_edit")
     *
     * @param OrganizationService $service
     * @param Request $request
     * @return JsonResponse
     */
    public function edit(Request $request, OrganizationService $service): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $id = intval($parameters['id']) ?? -1;
        $data = $parameters['data'] ?? [];

        if ($id === -1 || count($data) === 0) {
            return new JsonResponse([]);
        }

        return new JsonResponse($service->update($id, $data));
    }

    /**
     * @Route("/organizations/create", name="organization_create")
     *
     * @param OrganizationService $service
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request, OrganizationService $service): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);
        $data = $parameters['data'] ?? [];

        if (count($data) === 0) {
            return new JsonResponse($service->getAll());
        }

        return new JsonResponse($service->create($data));
    }
}
